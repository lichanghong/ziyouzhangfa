export interface VipPlan {
  id: string
  name: string
  price: number
  originalPrice: number
  periodUnit: string
  badge: string | null
}

export interface VipPlans {
  currency: string
  paymentChannel: string
  note: string
  plans: VipPlan[]
}

export interface AppConfig {
  platform: string
  latestVersion: string
  minSupportedVersion: string
  downloadUrl: string
  releaseNotes: string
  forcedUpdate: boolean
}
