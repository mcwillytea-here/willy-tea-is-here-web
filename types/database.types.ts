export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tracks: {
        Row: {
          id: string
          created_at: string
          title: string
          audio_url: string
          cover_url: string | null
          release_date: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          audio_url: string
          cover_url?: string | null
          release_date?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          audio_url?: string
          cover_url?: string | null
          release_date?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
