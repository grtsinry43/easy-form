// 引入 VueComType 类型，用于表示 Vue 组件
import type { VueComType } from './common';

// 定义基础属性接口，表示每个组件的通用属性
export interface BaseProps {
  id: string; // 组件的唯一标识符
  isShown: boolean; // 是否显示组件
  name: string; // 组件的名称
  editCom: VueComType; // 编辑组件的 Vue 组件类型
}

// 定义字符串数组类型
export type StringValueArr = string[];

// 定义键值对数组类型
export type KeyValueArr = Array<{ key: string; value: string }>;

// 定义带图片标题和描述的键值对数组类型
export type PicTitleDescValueArr = Array<{
  picTitle: string; // 图片标题
  picDesc: string; // 图片描述
  key: string; // 键
}>;

// 定义文本组件的属性接口，继承自 BaseProps
export interface TextProps extends BaseProps {
  value: string; // 文本的值
}

// 定义选项组件的属性接口，继承自 BaseProps
export interface OptionsProps extends BaseProps {
  value: StringValueArr | KeyValueArr | PicTitleDescValueArr; // 选项的值，可以是多种类型
  currentValue: number; // 当前选中的值
}

// 定义每个组件的公共设置项接口
export interface BaseValue {
  title: TextProps; // 标题设置
  desc: TextProps; // 描述设置
  position: OptionsProps; // 位置设置
  titleSize: OptionsProps; // 标题大小设置
  descSize: OptionsProps; // 描述大小设置
  titleWeight: OptionsProps; // 标题粗细设置
  descWeight: OptionsProps; // 描述粗细设置
  titleItalic: OptionsProps; // 标题斜体设置
  descItalic: OptionsProps; // 描述斜体设置
  titleColor: TextProps; // 标题颜色设置
  descColor: TextProps; // 描述颜色设置
}

// 定义带有选项设置项的组件设置接口，继承自 BaseValue
export interface OptionsValue extends BaseValue {
  options: OptionsProps; // 选项设置
}
