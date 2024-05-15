import {
  Mail,
  Home,
  Airplay,
  Circle,
  Phone,
  User,
  Book,
  Paperclip,
  Briefcase,
  MessageSquare,
  Activity,
  Layers,
} from "react-feather";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Layers size={20} />,
    navLink: "/home",
  },
  {
    id: "user",
    title: "مدیریت کاربران",
    icon: <User size={20} />,
    navLink: "/user",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
    ],
  },
  {
    id: "course",
    title: "مدیریت دوره ها",
    icon: <Book size={20} />,
    navLink: "/course",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
    ],
  },
  {
    id: "posts",
    title: "مدیریت پست ها ",
    icon: <Paperclip size={20} />,
    navLink: "/post",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
    ],
  },
  {
    id: "teachers",
    title: "اساتید",
    icon: <Briefcase size={20} />,
    navLink: "/teacher",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
    ],
  },
  {
    id: "comment",
    title: "مدیریت نظرات",
    icon: <MessageSquare size={20} />,
    navLink: "/comment",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
    ],
  },
  {
    id: "event",
    title: "رویداد ها",
    icon: <Activity size={20} />,
    navLink: "/event",
  },
  {
    id: "secondPage",
    title: "تیکت ها",
    icon: <Mail size={20} />,
    navLink: "/second-page",
  },
  {
    id: "smaplePage",
    title: "Sample Page",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
    ],
  },
];
