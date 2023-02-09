const TimePaths = [
  {
    path: 'AM Peak',
    children: []
  },
  {
    path: 'Off Peak',
    children: []
  },
  {
    path: 'PM Peak',
    children: []
  },
  {
    path: 'Night Time',
    children: []
  }
];


const BasicPaths = [
  {
    path: 'kabco-crashes',
    children: TimePaths
  },
  {
    path: 'kabc-crashes',
    children: TimePaths
  },

  {
    path: 'ka-crashes',
    children: TimePaths
  },
  {
    path: 'o-crashes',
    children: TimePaths
  }
];

const Times = {
  'AM_Peak': 'AM Peak',
  'PM_Peak': 'PM Peak',
  'Off_Peak': 'Off Peak',
  'Night_time': 'Night Time'
}
const createBasicPaths = (times, paths = []) => {
  return [...BasicPaths].filter(item => {
    if (paths.length === 0) {
      return true;
    }
    return paths.includes(item.path);
  }).map(item => {
    const temp = {...item};

    temp.children = times.map(time => TimePaths.find(t => t.path === time));
    return temp;
  });
}


const freewayChildren = [
  {
    path: 'Urban Basic',
    children: BasicPaths.concat([{
      path: 'kab-crashes',
      children: TimePaths
    }])
  },
  {
    path: 'Rural Basic',
    children: [
      {
        path: 'kabco-crashes',
        children: [
            {
                path: 'PM Peak',
                children: []
            },
            {
                path: 'Non PM Peak',
                children: []
            }
        ]
      },
      {
        path: 'kabc-crashes',
        children: [
          {
            path: 'PM Peak',
            children: []
          },
          {
            path: 'Non PM Peak',
            children: []
          }]
      },

      {
        path: 'ka-crashes',
        children: [
          {
            path: 'PM Peak',
            children: []
          },
          {
            path: 'Non PM Peak',
            children: []
          }
        ]
      },
      {
        path: 'o-crashes',
        children: [
          {
            path: 'PM Peak',
            children: []
          },
          {
            path: 'Non PM Peak',
            children: []
          }
        ]
      },
      {
        path: 'kab-crashes',
        children: [
          {
            path: 'PM Peak',
            children: []
          },
          {
            path: 'Non PM Peak',
            children: []
          }
        ]
      }
    ],
  },
  {
    path: 'Merge',
    children: BasicPaths.concat([{
      path: 'kab-crashes',
      children: TimePaths
    }])
  },
  {
    path: 'Diverge',
    children: BasicPaths.concat([{
      path: 'kab-crashes',
      children: TimePaths
    }])
  },
  {
    path: 'Weaving',
    children: [
      {
        path: 'kabco-crashes',
        children: TimePaths
      },
      {
        path: 'kabc-crashes',
        children: TimePaths
      },

      {
        path: 'o-crashes',
        children: TimePaths
      }
    ]
  },
  {
    path: 'Ramp',
    children: [{
      path: 'kabco-crashes',
      children: TimePaths
    },
      {
        path: 'kabc-crashes',
        children: TimePaths
      },
      {
        path: 'kab-crashes',
        children: TimePaths
      },
      {
        path: 'o-crashes',
        children: TimePaths
      }]
  },

]

const navs = [
  {
    path: 'Home',
    children: []
  },
  {
    path: 'About',
    children: []
  },
  {
    path: 'Required Data',
    children: []
  },
  {
    path: 'Crash Prediction Models',
    children: [
      {
        path: 'Freeway Segment Types',
        children: freewayChildren
      },
      {
        path: 'Use Case Scenarios',
        children: [
          {
            path: 'High Occupancy Vehicle Lane',
            children: createBasicPaths([Times.AM_Peak, Times.PM_Peak], ['kabco-crashes', 'kabc-crashes', 'kab-crashes', 'o-crashes'])
          },
          {
            path: 'Variable Speed Limit',
            children: createBasicPaths([Times.AM_Peak, Times.PM_Peak, Times.Off_Peak])
          },
          {
            path: 'Hard Shoulder Running',
            children: createBasicPaths([Times.AM_Peak, Times.PM_Peak], ['kabco-crashes', 'kabc-crashes', 'kab-crashes', 'o-crashes'])
          },
          {
            path: 'High Occupancy Toll Lane',
            children: [
              {
                path: 'kabco-crashes',
                children: TimePaths
              },
              {
                path: 'kabc-crashes',
                children: TimePaths
              },
              {
                path: 'o-crashes',
                children: TimePaths
              }
            ]
          },
          // {
          //     path: 'Reversible Lane',
          //     children: createBasicPaths([Times.AM_Peak, Times.PM_Peak])
          // },
          {
            path: 'Ramp Metering',
            children: createBasicPaths([Times.AM_Peak, Times.PM_Peak], ['kabco-crashes', 'o-crashes'])
          },
          {
            path: 'Work Zone',
            children: [
              {
                path: 'kabco-crashes',
                children: TimePaths
              },
              {
                path: 'kabc-crashes',
                children: TimePaths
              },
              {
                path: 'kab-crashes',
                children: TimePaths
              },
              {
                path: 'ka-crashes',
                children: TimePaths
              },
              {
                path: 'o-crashes',
                children: TimePaths
              }
            ]
          }
        ]
      },

    ]
  },
  {
    path: 'Contact Us',
    children: []
  }
]

module.exports = navs;
