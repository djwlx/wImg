import { FC } from 'react';
import FileUpload from './FileUpload';
import { Box, Card, Link } from '@chakra-ui/react';

const UploadPage: FC = () => {
  return (
    <Box padding="16px 16px" style={{ height: 'calc(100vh - 60px)', position: 'relative' }}>
      <Card padding="16px">
        <FileUpload />
      </Card>
      <Link
        color="teal.500"
        style={{
          position: 'absolute',
          bottom: 10,
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral"
      >
        <span>本网站由</span>
        <img style={{ height: 100, marginTop: 20 }} src="../../../public/youpaiyun.svg"></img>
        <span>提供CDN加速/云储存服务</span>
      </Link>
    </Box>
  );
};
export default UploadPage;
