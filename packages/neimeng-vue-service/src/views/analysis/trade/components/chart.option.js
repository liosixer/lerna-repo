export const chartBarOption = {
  categories: [],
  unit: '宗',
  nameY: '(宗)',
  gridTop: '30px',
  gridBottom: '10px',
  gridLeft: '0',
  gridRight: '0',
  axisLabelShow: false,
  xycolor: '#787677',
  splitLineX: false,
  inverseX: false,
  splitLineY: false,
  dataZoomShow: true,
  boundaryGap: true,
  colorArr: ['#1875F0', '#1890ff', '#1890ff', '#1890ff', '#1890ff'],
  series: [
    {
      name: '交易量',
      type: 'bar',
      barMaxWidth: '50%',
      data: [],
    },
  ],
};

export const chartCircleOption = {
  series: [
    {
      name: '近一年各行业交易量占比',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: true, //是否启用防止标签重叠策略，默认开启
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}: {d}%',
          },
        },
      },
      left: 20,
      data: [],
    },
  ],
  colorArr: ['#1875F0', '#6255FF', '#FFA121', '#50D166'],
};

export const chartAreaOption = {
  categories: [],
  unit: '项',
  nameY: '(宗)',
  gridTop: '30px',
  gridBottom: '10px',
  gridLeft: '3%',
  gridRight: '3%',
  axisLabelShow: false,
  xycolor: '#787677',
  splitLineX: false,
  inverseX: false,
  splitLineY: false,
  dataZoomShow: true,
  boundaryGap: true,
  colorArr: ['#1875F0', '#6255FF', '#FFA121', '#50D166', '#AAB9D1'],
  series: [],
  areaBg: [
    [
      { offset: 0, color: 'rgba(24, 117, 240, 0.3)' },
      { offset: 1, color: 'rgba(24, 117, 240, 0)' },
    ],
    [
      { offset: 0, color: 'rgba(98, 85, 255, 0.3)' },
      { offset: 1, color: 'rgba(98, 85, 255, 0)' },
    ],
    [
      { offset: 0, color: 'rgba(255, 161, 33, 0.3)' },
      { offset: 1, color: 'rgba(255, 161, 33, 0)' },
    ],
    [
      { offset: 0, color: 'rgba(80, 209, 102, 0.3)' },
      { offset: 1, color: 'rgba(80, 209, 102, 0)' },
    ],
    [
      { offset: 0, color: 'rgba(170, 185, 209, 0.3)' },
      { offset: 1, color: 'rgba(170, 185, 209, 0)' },
    ],
  ],
  legendData: ['工程建设', '政府采购', '自然资源', '产权交易', '其它交易'],
};
