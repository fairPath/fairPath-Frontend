import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { File } from 'lucide-react';
import { ResumeDropdown } from './ResumeDropdown';

const ResumeCard = () => {
  return (
    <div>
      {' '}
      <Card className="rounded-2xl">
        <CardHeader className="pb-0">
          <CardTitle className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Resumes
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center">
            <div className="flex items-center justify-center size-13 rounded-full bg-muted">
              <File className="size-8 text-muted-foreground" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-foreground">Resume 1</h3>
              <p className="text-xs text-muted-foreground">Last updated: Today</p>
            </div>
            <div className="ml-auto">
              <ResumeDropdown />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeCard;
