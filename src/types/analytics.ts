// Analytics event types and interfaces

export interface BaseEventParams {
  page_path?: string
  page_title?: string
  timestamp?: number
}

export interface WhatsAppClickParams extends BaseEventParams {
  source_page: string
  button_location: string
}

export interface FormEventParams extends BaseEventParams {
  form_name: string
  form_action?: string
}

export interface FormFieldEventParams extends FormEventParams {
  field_name: string
  field_value?: string
  error_message?: string
}

export interface FormSubmitParams extends FormEventParams {
  submission_id?: string
  success: boolean
  error_message?: string
}

export interface ConversionEventParams extends BaseEventParams {
  conversion_name: string
  conversion_value?: number
  currency?: string
}

export interface ScrollDepthParams extends BaseEventParams {
  scroll_percentage: number
}

export interface ServiceViewParams extends BaseEventParams {
  service_name: string
  service_slug: string
}

export interface PortfolioClickParams extends BaseEventParams {
  portfolio_item: string
  portfolio_category: string
}

export interface NavigationClickParams extends BaseEventParams {
  link_text: string
  link_url: string
  link_type: 'internal' | 'external'
}

export type AnalyticsEventName =
  | 'whatsapp_click'
  | 'form_start'
  | 'form_field_focus'
  | 'form_field_blur'
  | 'form_field_error'
  | 'form_submit'
  | 'lead_submit'
  | 'scroll_depth'
  | 'service_view'
  | 'portfolio_click'
  | 'navigation_click'
  | 'outbound_link_click'

export type AnalyticsEventParams =
  | WhatsAppClickParams
  | FormEventParams
  | FormFieldEventParams
  | FormSubmitParams
  | ConversionEventParams
  | ScrollDepthParams
  | ServiceViewParams
  | PortfolioClickParams
  | NavigationClickParams
  | BaseEventParams
