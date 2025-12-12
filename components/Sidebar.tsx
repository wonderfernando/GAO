// components/Sidebar.tsx
import Link from 'next/link';
import { FaBell, FaCog, FaHome, FaUserFriends } from 'react-icons/fa';

const menuItems = [
  { name: 'Início', icon: <FaHome className="mr-3" />, path: '/' },
  { name: 'Amigos', icon: <FaUserFriends className="mr-3" />, path: '/friends' },
  { name: 'Notificações', icon: <FaBell className="mr-3" />, path: '/notifications' },
  { name: 'Configurações', icon: <FaCog className="mr-3" />, path: '/settings' },
];

type MenuItem = {
  name: string;
  icon: JSX.Element;
  path: string;
};

const Sidebar = ({ navs }: { navs: MenuItem[] }) => {
  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-xl font-bold">Business Wave</h1>
      </div>
      <nav className="flex-1">
        <ul>
          {navs.map((item: MenuItem) => (
            <li key={item.name} className="flex items-center p-4 hover:bg-gray-700">
              <Link href={item.path} className="flex items-center w-full">
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;