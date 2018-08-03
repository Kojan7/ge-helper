const shipBuff = [];
shipBuff[11] = "采集速度";
shipBuff[42] = "推力";
shipBuff[43] = "货舱";
shipBuff[46] = "攻击力";
shipBuff[47] = "射程";
shipBuff[48] = "血盾防空";
const shipDesc = [
  { id: 1000, title: "槽位", shipIndex: 6 },
  { id: 1001, title: "动力", shipIndex: 7 },
  { id: 1002, title: "推力", shipIndex: 8 },
  { id: 1003, title: "质量 (T)", shipIndex: 9 },
  { id: 1004, title: "仓库 (m³)", shipIndex: 10 },
  { id: 1005, title: "能源", shipIndex: 11 },
  // { id: 1006, title: "体积 (m³)", shipIndex: 17 },
  // { id: 1007, title: "生产时间", shipIndex: 18 },
  { id: 1008, title: "金属", shipIndex: 19 },
  // { id: 1009, title: "稀有元素", shipIndex: 20 },
  { id: 1010, title: "T2", shipIndex: 21 },
  // { id: 1011, title: "钛合金", shipIndex: 22 },
  // { id: 1012, title: "晶体", shipIndex: 23 },
  // { id: 1013, title: "芯片", shipIndex: 24 },
  { id: 1014, title: "T3", shipIndex: 25 },
  // { id: 1015, title: "纳米材料", shipIndex: 26 },
  // { id: 1016, title: "光子晶体", shipIndex: 27 },
  // { id: 1017, title: "量子芯片", shipIndex: 28 },
  { id: 1018, title: "智能核心", shipIndex: 31 }
];
const shipLimit = [];
shipLimit[5] = "△"; // Miner
shipLimit[9] = "▽"; // Engine
shipLimit[7] = "▩"; // Armor
shipLimit[10] = "□"; // Container

export { shipBuff, shipDesc, shipLimit };