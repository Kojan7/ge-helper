const mRetro = [63, 64, 65, 69, 70, 73, 74, 75, 76, 81, 82, 85, 87, 89, 90, 91, 92, 97, 99, 101, 103];
const lRetro = [66, 67, 68, 71, 72, 77, 78, 79, 80, 83, 84, 86, 88, 93, 94, 95, 96, 98, 100, 102, 104];
const modDesc = [
  { id: 5, name: "HP" },
  { id: 6, name: "动力需求" },
  { id: 7, name: "动力输出" },
  { id: 8, name: "推力" },
  { id: 9, name: "质量", suffix: " T" },
  { id: 39, name: "体积", suffix: " m³" },
  { id: 10, name: "仓库", suffix: " m³" },
  { id: 11, name: "能源" },
  { id: 12, name: "攻击力" },
  { id: 13, name: "能源消耗" },
  { id: 14, name: "对护盾", suffix: " %", modifier: 100 },
  { id: 15, name: "对装甲", suffix: " %", modifier: 100 },
  { id: 16, name: "对结构", suffix: " %", modifier: 100 },
  { id: 17, name: "磁轨减免", suffix: " %", modifier: 100 },
  { id: 18, name: "激光减免", suffix: " %", modifier: 100 },
  { id: 19, name: "导弹减免", suffix: " %", modifier: 100 },
  { id: 20, name: "装填间隔", suffix: " s", modifier: 60 },
  { id: 21, name: "攻击距离", suffix: " km" },
  { id: 22, name: "攻击分辨率" },
  { id: 23, name: "穿甲" },
  { id: 24, name: "穿甲抵抗" },
  { id: 25, name: "爆炸范围" },
  { id: 26, name: "爆炸抵抗" },
  { id: 28, name: "子弹速度" },
  { id: 29, name: "子弹血量" },
  { id: 30, name: "照射时间", suffix: " s", modifier: 60 },
  { id: 31, name: "攻击方向" },
  { id: 32, name: "采集速度" },
  { id: 33, name: "护盾值" },
  { id: 34, name: "护盾恢复", suffix: " /s", modifier: 10 },
  { id: 38, name: "研究点" },
  { id: 40, name: "生产时间", suffix: " s" },
  { id: 41, name: "金属" },
  { id: 42, name: "稀有元素" },
  { id: 43, name: "燃料" },
  { id: 44, name: "钛合金" },
  { id: 45, name: "晶体" },
  { id: 46, name: "芯片" },
  { id: 47, name: "热核燃料" },
  { id: 48, name: "纳米材料" },
  { id: 49, name: "光子晶体" },
  { id: 50, name: "量子芯片" },
  { id: 51, name: "智能核心" },
  { id: 52, name: "暗物质" }
];
const upgradeFee = {
  Score: 300,
  Sdef: 75,
  Sother: 150,

  Mcore: 57600,
  Mdef: 14400,
  Mother: 28800,

  Lcore: 3456000,
  Ldef: 864000,
  Lother: 1728000
};
const modChoice = {
  size: [
    { value: 0, text: "S" },
    { value: 1, text: "M" },
    { value: 2, text: "L" },
    { value: 3, text: "M+" },
    { value: 4, text: "L+" }
  ],
  item: [
    { value: 0, text: "穿甲磁轨炮", style: "" },
    { value: 1, text: "高爆磁轨炮", style: "" },
    { value: 2, text: "速射磁轨炮", style: "" },
    { value: 3, text: "脉冲激光器", style: "" },
    { value: 4, text: "集束激光器", style: "" },
    { value: 5, text: "直射导弹", style: "" },
    { value: 6, text: "左侧导弹", style: "" },
    { value: 7, text: "右侧导弹", style: "" },
    { value: 8, text: "绕后导弹", style: "" },
    { value: 9, text: "脉冲防空镭射", style: "" },
    { value: 10, text: "集束防空镭射", style: "" },
    { value: 11, text: "采矿器", style: "" },
    { value: 12, text: "动力核心", style: "" },
    { value: 13, text: "标准装甲", style: "" },
    { value: 14, text: "镜面装甲", style: "" },
    { value: 15, text: "反应装甲", style: "" },
    { value: 16, text: "偏转装甲", style: "" },
    { value: 17, text: "护盾发生器", style: "" },
    { value: 18, text: "核融合引擎", style: "" },
    { value: 19, text: "货柜", style: "" },
    { value: 20, text: "能源舱", style: "" }
  ]
};
export { mRetro, lRetro, modDesc, upgradeFee, modChoice };