import { CloseIcon, EditIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  useColorModeValue,
  Image,
  Button,
  List,
  ListItem,
  Flex,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import React, { FC, useRef, useState } from "react";
import { getSizeLabelByByted, readFileAsDataURL } from "@/utils/file";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface FileType {
  id: string;
  file: File;
  name: string;
  size: number;
  dataUrl: string;
  status?: IMAGE_STATUS;
}

interface FileUploadProps {}

enum IMAGE_STATUS {
  initial = "initial",
  pending = "pending",
  success = "success",
  error = "error",
}

const FileUpload: FC<FileUploadProps> = (props) => {
  const {} = props;

  const textColor = useColorModeValue("grey", "white");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [fileList, setFileList] = useState<FileType[]>([]);
  const [parent] = useAutoAnimate();

  // 图片格式化
  const processFile = async (file: File) => {
    const dataUrl = await readFileAsDataURL(file);

    return {
      id: Math.random().toString(),
      file: file,
      name: file.name,
      size: file.size,
      status: IMAGE_STATUS.initial,
      dataUrl,
    };
  };

  // 图片改变
  const onFileChange = async () => {
    const fileList = [...(fileRef.current?.files as FileList)];
    uploadFiles(fileList);
  };

  // 图片处理
  const uploadFiles = (files: File[]) => {
    const postFiles = files.map((file) => {
      return processFile(file);
    });

    Promise.all(postFiles).then((fileList) => {
      setFileList(fileList);
      console.log();
    });
  };

  // 单个图片上传
  const postFile = (file: FileType) => {
    console.log(file, "upload");
  };
  //
  const editFile = (file: FileType) => {
    console.log(file, "edit");
  };

  const deleteFile = (id: string) => {
    const newFileList = fileList.filter((item) => item.id !== id);
    setFileList(newFileList);
  };

  return (
    <Box>
      <span>
        <input
          ref={fileRef}
          type="file"
          multiple
          style={{ display: "none" }}
          onClick={(e) => e.stopPropagation()}
          onChange={onFileChange}
        />

        <Button
          leftIcon={<TriangleUpIcon />}
          onClick={() => fileRef.current?.click()}
        >
          上传图片
        </Button>
      </span>
      <Box borderRadius="3px" marginTop="16px">
        <List spacing={2} ref={parent}>
          {fileList.map((item, index) => {
            return (
              <ListItem key={item.id}>
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center">
                    <Image
                      boxSize="50px"
                      objectFit="cover"
                      src={item.dataUrl}
                      alt={item.name}
                    />
                    <Box marginLeft="6px">
                      <Text color={textColor} fontSize="sm">
                        {item.name}
                      </Text>
                      <Text color={textColor} fontSize="sm">
                        {getSizeLabelByByted(item.size)}
                      </Text>
                    </Box>
                  </Flex>
                  <ButtonGroup gap={1}>
                    <IconButton
                      colorScheme="teal"
                      aria-label="Search database"
                      icon={<EditIcon />}
                      fontSize="12px"
                      size={"sm"}
                    />
                    <IconButton
                      colorScheme="red"
                      aria-label="Search database"
                      icon={<CloseIcon />}
                      fontSize="12px"
                      size={"sm"}
                      onClick={() => deleteFile(item.id)}
                    />
                    <IconButton
                      colorScheme="blue"
                      aria-label="Search database"
                      icon={<TriangleUpIcon />}
                      fontSize="12px"
                      size={"sm"}
                      onClick={() => postFile(item)}
                    />
                  </ButtonGroup>
                </Flex>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};
export default FileUpload;
