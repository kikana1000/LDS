export const MenuItems = [
  {
    id:0,
    title: "Phases of Traceability",
    url: "/tracking/visualizeTrackingPhase",
    cName: "nav-links",
  },
  {
    title: "Traceability of Products",
    url: "/trackingList",
    cName: "nav-links",
  },
  {
    id:1,
    title: "Master Data",
    url: "/service",
    submenu: [
      {
        id:1.1,
        title: 'Materials',
        url: '/material',
      },
      {
        id:1.2,
        title: 'Production Batches',
        url: '/production-batch',
      },
      {
        id:1.3,
        title: 'Establishments',
        url: '/establishment',
        permission: 1,
      },
      {
        id:1.4,
        title: 'Production Machines',
        url: '/machine',
        permission: 1,
      },
      {
        id:1.5,
        title: 'Vehicles',
        url: '/vehicle',
        permission: 1,
      },
      {
        id:1.6,
        title: 'Employees',
        url: '/employee',
        permission: 1,
      },
      {
        id:1.7,
        title: 'Suppliers',
        url: '/supplier',
        permission: 1,
      },
      {
        id:1.8,
        title: 'Clients',
        url: '/client',
        permission: 1,
      }, {
        id:1.9,
        title: 'Product',
        url: '/product',
        permission: 1,
      },
    ],
  }
];



