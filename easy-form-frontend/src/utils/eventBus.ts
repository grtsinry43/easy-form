import mitt from 'mitt'

// 定义事件总线的事件类型
type Events = {
  [eventName: string]: any // 可以根据需要定义具体的事件和参数类型
}

// 创建事件总线实例
const eventBus = mitt<Events>()

export default eventBus
