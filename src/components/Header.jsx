import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Bell, LogOut, ChevronDown,
  Menu, PanelLeftClose, PanelLeftOpen,
  Sun, Moon,
} from "lucide-react";

import { selectUser }        from "../store/authSlice";
import { logoutThunk }       from "../store/authSlice";
import { toggleTheme, selectThemeMode } from "../store/themeSlice";
import { useGetProfileQuery } from "../store/api/settingApi";

const TITLES = {
  "/dashboard":   { main: "Dashboard",   sub: "Overview of your mill"   },
  "/production":  { main: "Production",  sub: "Manage batch processing" },
  "/inventory":   { main: "Inventory",   sub: "Stock levels & Tracking" },
  "/category":    { main: "Category",    sub: "Manage your category"    },
  "/formulation": { main: "Formulation", sub: "Recipe & Mix management" },
  "/sales":       { main: "Sales",       sub: "Manage delivered orders" },
  "/orders":      { main: "Orders",      sub: "Manage customer orders"  },
  "/customers":   { main: "Customers",   sub: "Client directory"        },
  "/staff":       { main: "Staff",       sub: "Staff data collection"   },
  "/settings":    { main: "Settings",    sub: "App configuration"       },
};

export default function Header({ onMenuClick, collapsed, onCollapseClick }) {
  // ✅ useAuth() replaced — user from Redux, dispatch for logout + theme
  const dispatch  = useDispatch();
  const user      = useSelector(selectUser);
  const themeMode = useSelector(selectThemeMode);

  const navigate = useNavigate();
  const location = useLocation();
  const [dropOpen, setDropOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  // (invalidatesTags: ['Profile']), so Header always stays in sync.
  const { data: profile } = useGetProfileQuery();
  const profileImg = profile?.profile || null;

  const currentPath = TITLES[location.pathname]
    || { main: "FeedMill Pro", sub: "ERP System" };

  // logout: dispatch thunk instead of calling logoutUser() + logout()
  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/login", { replace: true });
  };

  // profile shape: { fullname, username, email, role, profile, ... }
  const initials = profile?.fullname
    ? profile.fullname.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : profile?.username?.[0]?.toUpperCase() || user?.username?.[0]?.toUpperCase() || "AM";

  return (
    <header className="h-20 bg-white dark:bg-gray-900
                       border-b border-gray-100 dark:border-gray-800
                       flex items-center px-4 sm:px-6 gap-3 shrink-0
                       sticky top-0 z-30">

      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 text-gray-500 dark:text-gray-400
                   hover:bg-gray-100 dark:hover:bg-gray-800
                   rounded-xl transition-colors"
      >
        <Menu size={18} className="w-10 h-8" />
      </button>
      {/* Collapse button */}
      <button
        onClick={onCollapseClick}
        className="hidden lg:flex p-2 text-gray-500 dark:text-gray-400
                   hover:bg-gray-100 dark:hover:bg-gray-800
                   rounded-xl transition-colors"
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed
          ? <PanelLeftOpen  size={20} />
          : <PanelLeftClose size={20} />}
      </button>
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-lg sm:text-2xl font-bold
                       text-gray-800 dark:text-white
                       leading-none truncate py-1">
          {currentPath.main}
        </h1>
        <p className="hidden sm:block text-[10px]
                      text-gray-400 dark:text-gray-500
                      mt-0.5 uppercase tracking-wider font-medium">
          {currentPath.sub}
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">

        {/* ── Theme toggle button (NEW feature) ── */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="relative p-2 text-gray-500 dark:text-gray-400
                     hover:bg-gray-50 dark:hover:bg-gray-800
                     rounded-xl transition-colors"
          title={themeMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {themeMode === "dark"
            ? <Sun  size={20} className="text-yellow-400" />
            : <Moon size={20} />}
        </button>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropOpen(!dropOpen)}
            className="flex items-center gap-1 sm:gap-2
                       hover:bg-gray-50 dark:hover:bg-gray-800
                       rounded-xl p-1 transition-colors"
          >
            {profileImg && !imgError ? (
              <img
                src={profileImg}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover shrink-0
                           border-2 border-emerald-100"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#1c3a1c] text-white
                              flex items-center justify-center text-xs
                              font-bold shrink-0">
                {initials}
              </div>
            )}
            <ChevronDown size={13} className="text-gray-400 dark:text-gray-500" />
          </button>

          {dropOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDropOpen(false)}
              />
              <div className="absolute right-0 top-11 z-20
                              bg-white dark:bg-gray-900
                              rounded-xl shadow-xl
                              border border-gray-100 dark:border-gray-800
                              w-48 py-1 overflow-hidden">

                {/* User info */}
                <div className="px-4 py-3
                                border-b border-gray-50 dark:border-gray-800
                                flex items-center gap-3">
                  {profileImg && !imgError ? (
                    <img
                      src={profileImg}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover shrink-0
                                 border-2 border-emerald-100"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#1c3a1c]
                                    text-white flex items-center justify-center
                                    text-xs font-bold shrink-0">
                      {initials}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-bold
                                  text-gray-800 dark:text-white truncate">
                      {profile?.fullname || profile?.username || user?.fullname || "Admin"}
                    </p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">
                      {profile?.email || user?.email || "admin@feedmill.com"}
                    </p>
                  </div>
                </div>

                {/* Sign out */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5
                             text-sm text-red-600 hover:bg-red-50
                             dark:hover:bg-red-950/40 transition-colors"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}