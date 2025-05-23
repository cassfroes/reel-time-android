
import { Home, Search, Plus, MessageCircle, User } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem = ({ icon, label, to, active }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex flex-col items-center justify-center px-2",
      active ? "text-white" : "text-gray-400"
    )}
  >
    <div className="text-2xl">{icon}</div>
    <span className="text-xs mt-1">{label}</span>
  </Link>
);

const BottomNavigation = ({ activeTab = "home" }: { activeTab?: string }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-tiktok-dark border-t border-tiktok-gray flex justify-around items-center px-2 z-50">
      <NavItem
        icon={<Home />}
        label="Home"
        to="/"
        active={activeTab === "home"}
      />
      <NavItem
        icon={<Search />}
        label="Discover"
        to="/discover"
        active={activeTab === "discover"}
      />
      <div className="flex flex-col items-center justify-center px-2">
        <button 
          className="w-12 h-8 flex items-center justify-center rounded-md bg-gradient-to-r from-tiktok-blue to-tiktok-pink"
        >
          <Plus className="text-white w-5 h-5" />
        </button>
      </div>
      <NavItem
        icon={<MessageCircle />}
        label="Inbox"
        to="/inbox"
        active={activeTab === "inbox"}
      />
      <NavItem
        icon={<User />}
        label="Profile"
        to="/profile"
        active={activeTab === "profile"}
      />
    </div>
  );
};

export default BottomNavigation;
