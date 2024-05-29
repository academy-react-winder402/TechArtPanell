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
        title: "لیست کاربران",
        icon: <Circle size={12} />,
        navLink: "/user",
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
        title: "لیست دوره ها",
        icon: <Circle size={12} />,
        navLink: "/course",
      },
      {
        id: "invoiceList",
        title: "رزرو دوره ها",
        icon: <Circle size={12} />,
        navLink: "/CourseReserve",
      },
    ],
  },
  {
    id: "posts",
    title: "مدیریت پست ها ",
    icon: <Paperclip size={20} />,
    navLink: "",
    children: [
      {
        id: "invoiceList",
        title: " لیست مقاله",
        icon: <Circle size={12} />,
        navLink: "/post",
      },
      {
        id: "invoiceList",
        title: " ادیت مقاله",
        icon: <Circle size={12} />,
        navLink: "/post/edit",
      },
      {
        id: "invoiceList",
        title: " جزییات مقاله",
        icon: <Circle size={12} />,
        navLink: "/post/detail",
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
        title: "همه اساتید",
        icon: <Circle size={12} />,
        navLink: "/teacher",
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
];
