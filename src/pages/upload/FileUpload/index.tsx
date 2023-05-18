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
  Stack,
  Badge,
} from "@chakra-ui/react";
import React, { FC, useRef, useState } from "react";
import { getSizeLabelByByted, readFileAsDataURL } from "@/utils/file";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { upload } from "@/services/file";

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
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<FileType[]>([]);
  const [parent] = useAutoAnimate();

  // 图片改变
  const onFileChange = async () => {
    const fileListTemp = [...(fileRef.current?.files as FileList)];
    uploadFiles(fileListTemp);
  };

  // 对单条的图片的处理
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

  // 上传前的处理
  const uploadFiles = (files: File[]) => {
    const postFiles = files.map((file) => {
      return processFile(file);
    });

    Promise.all(postFiles).then((fileListTemp) => {
      if (fileList.length === 0) {
        setFileList(fileListTemp);
      } else {
        const fileListAll = [...fileList, ...fileListTemp];
        setFileList(fileListAll);
      }
    });
  };

  // 单个图片上传
  const postFile = async (file: FileType) => {
    const formData = new FormData();
    formData.append("file", file.file);
    const fileListTemp = [...fileList];
    const index = fileListTemp.findIndex((item) => item.id === file.id);
    fileListTemp[index].status = IMAGE_STATUS.pending;
    setFileList(fileListTemp);
    const result = await upload(formData);
    if (result.status === 200) {
      fileListTemp[index].status = IMAGE_STATUS.success;
      setFileList(fileListTemp);
    } else {
      fileListTemp[index].status = IMAGE_STATUS.error;
      setFileList(fileListTemp);
    }
  };

  //编辑
  // const editFile = (file: FileType) => {
  //   console.log(file, "edit");
  // };

  const deleteFile = (id: string) => {
    const newFileList = fileList.filter((item) => item.id !== id);
    setFileList(newFileList);
  };

  const uploadAll = () => {
    fileList.forEach((item) => {
      postFile(item);
    });
  };

  return (
    <Box>
      <span>
        <input
          ref={fileRef}
          type="file"
          multiple
          value=""
          style={{ display: "none" }}
          onClick={(e) => e.stopPropagation()}
          onChange={onFileChange}
        />

        <Stack>
          <Button
            leftIcon={<TriangleUpIcon />}
            onClick={() => fileRef.current?.click()}
          >
            上传图片
          </Button>
          <Button leftIcon={<TriangleUpIcon />} onClick={uploadAll}>
            上传全部
          </Button>
        </Stack>
      </span>
      <Box borderRadius="3px" marginTop="16px">
        <List spacing={2} ref={parent}>
          {fileList.map((item, index) => {
            return (
              <ListItem key={item.id}>
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex alignItems="center">
                    <Image
                      boxSize="66px"
                      objectFit="cover"
                      src={item.dataUrl}
                      alt={item.name}
                    />
                    <Box marginLeft="6px">
                      <Text color={textColor} fontSize="sm">
                        {item.name}
                      </Text>
                      {item.status === IMAGE_STATUS.success && (
                        <Badge variant="solid" colorScheme="green">
                          Success
                        </Badge>
                      )}
                      {item.status === IMAGE_STATUS.pending && (
                        <Badge variant="solid" colorScheme="yellow">
                          Pending
                        </Badge>
                      )}
                      {item.status === IMAGE_STATUS.error && (
                        <Badge variant="solid" colorScheme="red">
                          Error
                        </Badge>
                      )}
                      {item.status === IMAGE_STATUS.initial && (
                        <Badge>Initial</Badge>
                      )}

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
                      isDisabled={item.status === IMAGE_STATUS.success}
                      onClick={() => postFile(item)}
                    />
                  </ButtonGroup>
                </Flex>
                {/* <Progress
                  colorScheme="green"
                  size="sm"
                  marginTop={1}
                  value={item.progress}
                /> */}
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};
export default FileUpload;
