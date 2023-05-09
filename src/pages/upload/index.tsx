import { FC, useState } from "react";
import FileUpload from "@/components/FileUpload";
import { Box, List, ListItem, Card } from "@chakra-ui/react";

const UploadPage: FC = () => {
  return (
    <Box padding="16px 16px">
      <Card padding="16px">
        <FileUpload />
      </Card>
    </Box>
  );
};
export default UploadPage;
