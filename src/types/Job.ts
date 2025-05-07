export interface Job {
    id: string;
    title: string;
    description: string;
    salary_min: number;
    salary_max: number;
    salary_is_predicted: string;
    created: string;
    redirect_url: string;
    company: {
      display_name: string;
    };
    location: {
      display_name: string;
    };
  }