export type UserType = 'student' | 'staff' | 'parent' | 'admin';

export interface UserProfile {
  id: string;
  user_id: string;
  user_type: UserType;
  full_name: string;
  phone_number?: string;
  profile_image_url?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  user_profile_id: string;
  student_id: string;
  ges_id?: string;
  admission_date: string;
  class?: string;
  section?: string;
  roll_number?: string;
  parent_id?: string;
  blood_group?: string;
  medical_conditions?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Staff {
  id: string;
  user_profile_id: string;
  staff_id: string;
  employee_type?: string;
  department?: string;
  designation?: string;
  qualification?: string;
  joining_date: string;
  salary?: number;
  bank_account_number?: string;
  ssnit_number?: string;
  tin_number?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Parent {
  id: string;
  user_profile_id: string;
  parent_id: string;
  relationship?: string;
  occupation?: string;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: UserProfile;
        Insert: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>;
      };
      students: {
        Row: Student;
        Insert: Omit<Student, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Student, 'id' | 'created_at' | 'updated_at'>>;
      };
      staff: {
        Row: Staff;
        Insert: Omit<Staff, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Staff, 'id' | 'created_at' | 'updated_at'>>;
      };
      parents: {
        Row: Parent;
        Insert: Omit<Parent, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Parent, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}
