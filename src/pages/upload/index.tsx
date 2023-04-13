import { FC, useState } from "react";
import FileUpload from "@/components/FileUpload";
import { Box, List, ListItem, Card } from "@chakra-ui/react";

const UploadPage: FC = () => {
  const [imageList, setImageList] = useState<Image[]>();

  return (
    <Box padding="16px 16px">
      <Card padding="16px">
        <FileUpload />
        <List></List>
      </Card>
    </Box>
  );
};
export default UploadPage;
