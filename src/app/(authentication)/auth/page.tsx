import { BsSlack } from 'react-icons/bs';

import Typography from '@/components/ui/typography';

const AuthPage = () => {
  return (
    <div className='grid min-h-screen place-content-center bg-white p-5 text-center'>
      <div className='max-w-[450px]'>
        <div className='mb-4 flex items-center justify-center gap-3'>
          <BsSlack size={30} />
          <Typography text='Slackzz' variant='h2' />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
