// utils/getMenuForRole.ts
import { menus, Role } from '@/app/config/menu';

export const getMenuForRole = (role: Role) =>
    menus.filter((item) => item.roles.includes(role));




