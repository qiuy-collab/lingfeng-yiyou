import { routeData, RouteId } from '@/lib/routeData'
import RouteDetailClient from './RouteDetailClient'

// 预生成静态页面参数
export function generateStaticParams() {
  return Object.keys(routeData).map((id) => ({
    id,
  }))
}

// 生成页面元数据
export function generateMetadata({ params }: { params: { id: string } }) {
  const route = routeData[params.id as RouteId]
  if (!route) return {}

  return {
    title: route.title.zh + ' | 岭风译游',
    description: route.highlights.zh,
  }
}

export default function RouteDetailPage({ params }: { params: { id: string } }) {
  const route = routeData[params.id as RouteId] || routeData['1']

  return <RouteDetailClient route={route} />
}
