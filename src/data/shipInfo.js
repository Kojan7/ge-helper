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
const shipChoice = {
  type: [
    { value: 0, text: "通用" },
    { value: 1, text: "防御" },
    { value: 2, text: "强袭" },
    { value: 3, text: "狙击" },
    { value: 4, text: "高速" },
    { value: 5, text: "采掘" },
    { value: 6, text: "运输" }
  ],
  size: [
    { value: 0, text: "护卫" },
    { value: 1, text: "驱逐" },
    { value: 2, text: "巡洋" },
    { value: 3, text: "战列" },
    { value: 4, text: "无畏" },
    { value: 5, text: "泰坦" }
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