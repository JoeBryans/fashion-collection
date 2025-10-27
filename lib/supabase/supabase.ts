export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          description: string
          id: string
          parent_id: string
          slug: string
          name: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      product: {
        Row: {
          brand: string
          categoryId: {
            id: string
            name: string
            description: string
            slug: string
            parent_id: string
          } 
          colors:[
            {
              color: string
            }
          ] 
          created_at: string
          description: string
          discount: number 
          id: string
          images: [
            {
              url: string
            }
          ]
          name: string
          price: number
          sizes: [
            {
              size: string
            }
          ]
          slug: string
          stockQty: number
          userId: string
        }
        Insert: {
          brand: string
          categoryId?: string
          colors?: Json | null
          created_at?: string
          description: string
          discount?: number | null
          id?: string
          images?: Json | null
          name: string
          price: number
          sizes?: Json | null
          slug: string
          stockQty: number
          userId?: string
        }
        Update: {
          brand?: string
          categoryId?: string
          colors?: Json | null
          created_at?: string
          description?: string
          discount?: number | null
          id?: string
          images?: Json | null
          name?: string
          price?: number
          sizes?: Json | null
          slug?: string
          stockQty?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          created_at: string
          email: string
          id: string
          image: string | null
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          image?: string | null
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          image?: string | null
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      address: {
        Row: {
          created_at: string
          location: string
          id: string
          country: string 
          state: string
          city: string 
          zip_code:string
        }
        Insert: {
          created_at?: string
          location: string
          id?: string
          city?: string 
          state: string
          country?: string 
          zip_code?: string 
        }
        Update: {
          created_at?: string
          location: string
          id?: string
          city?: string 
          state: string
          country?: string 
          zip_code?: string 
        }
        Relationships: []
      }
          order_items: {
        Row: {
          created_at: string
          id: number
          order_id: string | null
          price: number
          product_id: string
          quantity: number
          sub_total: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          order_id?: string | null
          price: number
          product_id?: string
          quantity: number
          sub_total?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          order_id?: string | null
          price?: number
          product_id?: string
          quantity?: number
          sub_total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          id: string
          order_status: Database["public"]["Enums"]["order_status"]
          payment_method: string
          payment_status: Database["public"]["Enums"]["payment_status"]
          shipping_address: Json
          total_price: number
          total_quantity: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          order_status?: Database["public"]["Enums"]["order_status"]
          payment_method: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          shipping_address: Json
          total_price: number
          total_quantity: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          order_status?: Database["public"]["Enums"]["order_status"]
          payment_method?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          shipping_address?: Json
          total_price?: number
          total_quantity?: number
          user_id?: string | null
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
      order_status: "pending" | "paid" | "delivered" | "shipped" | "cancel"
      payment_status: "pending" | "paid" | "successful" | "cancel" | "failed"|"unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
