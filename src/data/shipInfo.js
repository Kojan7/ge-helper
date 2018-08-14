const shipBuff = [];
shipBuff[11] = ["采集速度", "Mining"];
shipBuff[42] = ["推力", "Thrust"];
shipBuff[43] = ["货舱", "Cargo"];
shipBuff[46] = ["攻击力", "Attack"];
shipBuff[47] = ["射程", "Range"];
shipBuff[48] = ["血盾防空", "Defense"];
const shipDesc = [
  { id: 1000, title: "槽位", titleen: "Slots", shipIndex: 6 },
  { id: 1001, title: "动力", titleen: "CPU", shipIndex: 7 },
  { id: 1002, title: "推力", titleen: "Thrust", shipIndex: 8 },
  { id: 1003, title: "质量 (T)", titleen: "Mass (T)", shipIndex: 9 },
  { id: 1004, title: "仓库 (m³)", titleen: "Cargo (m³)", shipIndex: 10 },
  { id: 1005, title: "能源", titleen: "Energy", shipIndex: 11 },
  // { id: 1006, title: "体积 (m³)", titleen: "", shipIndex: 17 },
  // { id: 1007, title: "生产时间", titleen: "", shipIndex: 18 },
  { id: 1008, title: "金属", titleen: "Metal", shipIndex: 19 },
  // { id: 1009, title: "稀有元素", titleen: "", shipIndex: 20 },
  { id: 1010, title: "T2", titleen: "T2", shipIndex: 21 },
  // { id: 1011, title: "钛合金", titleen: "", shipIndex: 22 },
  // { id: 1012, title: "晶体", titleen: "", shipIndex: 23 },
  // { id: 1013, title: "芯片", titleen: "", shipIndex: 24 },
  { id: 1014, title: "T3", titleen: "T3", shipIndex: 25 },
  // { id: 1015, title: "纳米材料", titleen: "", shipIndex: 26 },
  // { id: 1016, title: "光子晶体", titleen: "", shipIndex: 27 },
  // { id: 1017, title: "量子芯片", titleen: "", shipIndex: 28 },
  { id: 1018, title: "智能核心", titleen: "AI core", shipIndex: 31 }
];
const shipLimit = [];
shipLimit[5] = "△"; // Miner
shipLimit[9] = "▽"; // Engine
shipLimit[7] = "▩"; // Armor
shipLimit[10] = "□"; // Container
const shipChoice = {
  type: [
    { value: 0, text: "通用", texten: "Standard" },
    { value: 1, text: "防御", texten: "Defensive" },
    { value: 2, text: "强袭", texten: "Assault" },
    { value: 3, text: "狙击", texten: "Sniper" },
    { value: 4, text: "高速", texten: "High-speed" },
    { value: 5, text: "采掘", texten: "Miner" },
    { value: 6, text: "运输", texten: "Transport" }
  ],
  size: [
    { value: 0, text: "护卫", texten: "Frigate" },
    { value: 1, text: "驱逐", texten: "Destroyer" },
    { value: 2, text: "巡洋", texten: "Cruiser" },
    { value: 3, text: "战列", texten: "Battleship" },
    { value: 4, text: "无畏", texten: "DD" },
    { value: 5, text: "泰坦", texten: "Titan" }
  ],
  level: [
    { value: 1, text: "Lv. 1" },
    { value: 2, text: "Lv. 2" },
    { value: 3, text: "Lv. 3" },
    { value: 4, text: "Lv. 4" },
    { value: 5, text: "Lv. 5" },
    { value: 6, text: "Lv. 6" },
    { value: 7, text: "Lv. 7" },
    { value: 8, text: "Lv. 8" },
    { value: 9, text: "Lv. 9" },
    { value: 10, text: "Lv. 10" },
    { value: 11, text: "Lv. 11" },
    { value: 12, text: "Lv. 12" }
  ]
};
export { shipBuff, shipDesc, shipLimit, shipChoice };