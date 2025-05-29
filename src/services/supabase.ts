import { createClient } from '@supabase/supabase-js';

import type { Database, NewStudentType } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

class SupabaseService {
  private static instance: SupabaseService;
  private supabase: ReturnType<typeof createClient<Database>>;

  private constructor() {
    this.supabase = createClient<Database>(supabaseUrl, supabaseKey);
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new SupabaseService();
    }

    return this.instance;
  }

  public async getStudents() {
    const { data, error } = await this.supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  public async getStudentById(id: number) {
    const { data, error } = await this.supabase
      .from('students')
      .select('*')
      .eq('id', id);

    if (error) throw error;
    return data;
  }

  public async createStudent(student: NewStudentType) {
    const { data, error } = await this.supabase
      .from('students')
      .insert([student])
      .select('*')
      .single();

    if (error) throw error;
    return data;
  }

  public async deleteStudent(id: number) {
    const { error } = await this.supabase
      .from('students')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { success: true };
  }

  public async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  }

  public async signUp(email: string, password: string, username: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) throw error;

    return data;
  }

  public async signOut() {
    const { error } = await this.supabase.auth.signOut();

    if (error) throw error;

    return { success: true };
  }
}

export default SupabaseService.getInstance();
