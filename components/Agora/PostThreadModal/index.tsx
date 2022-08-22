import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { Modal, Flex, Box, Text } from '@contco/core-ui';
import { Editor } from '@contco/editor';
import { ModalLarge, Heading3, InputLabel, Input, ButtonRound } from '../../UIComponents';

const TITLE = 'Create A New Thread';
const EDITOR_PLACEHOLDER = 'Click anywhere to start typing';

const StyledModal = styled(Modal)`
  ${css({
    bg: 'background',
    borderRadius: 10,
  })}
`;

const FormContainer = styled(Flex)`
  ${css({
    alignItems: 'center',
    flexDirection: 'column',
  })}
`;

const EditorScrollContainer = styled(Box)`
  ${css({
    height: 200,
    overflowY: 'scroll',
  })}
`;

const EditorContainer = styled(Box)`
  ${css({
    width: ['calc(80vw - 40px)', null, null, 480],
    color: 'secondary',
    bg: 'postBg',
    px: 3,
    pt: 1,
  })}
`;

const StyledEditor = styled(Editor)`
  ${css({
    height: '100%',
    minHeight: [120, null, null, 140],
    width: '100%',
  })}
`;

const FeeContainer = styled(Flex)`
  ${css({
    mt: 4,
    width: ['calc(80vw - 40px)', null, null, 480],
    justifyContent: 'space-between',
  })}
`;

const FeeText = styled(Text)`
  ${css({
    color: 'secondary',
    fontSize: ['8px', null, null, 0],
    fontWeight: 'bold',
  })}
`;

interface Props {
  isVisible: boolean;
  setVisible: (visibleState: boolean) => void;
}

const EMPTY_CONTENT = [{ type: 'paragraph', children: [{ text: '' }] }];

export const PostThreadModal: React.FC<Props> = ({ isVisible, setVisible }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<any>({});

  const onPostInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const isSubmitDisabled = useMemo(() => {
    const emptyContent =
      Object.keys(content).length === 0 || JSON.stringify(content?.raw) === JSON.stringify(EMPTY_CONTENT);
    if (title.trim() === '' || emptyContent) {
      return true;
    }
    return false;
  }, [content, title]);

  const onSubmit = () => {
    if (!isSubmitDisabled) {
      alert('create thread');
    }
  };

  return (
    <StyledModal isOpen={isVisible} onClose={() => setVisible(false)}>
      <ModalLarge>
        <Heading3>{TITLE}</Heading3>
        <FormContainer>
          <Box mt={4}>
            <InputLabel>Title</InputLabel>
            <Input onChange={onPostInput} name="title" type="text" placeholder="Write Title" />
          </Box>
          <Box mt={4}>
            <InputLabel>Content</InputLabel>
            <EditorScrollContainer>
              <EditorContainer>
                <StyledEditor
                  placeholder={EDITOR_PLACEHOLDER}
                  placeholderStyles={{ color: 'inherit' }}
                  data={content}
                  onContentUpdate={(d) => setContent(d)}
                />
              </EditorContainer>
            </EditorScrollContainer>
          </Box>
          <FeeContainer>
            <FeeText>TxFee:</FeeText>
            <FeeText>0 USTC</FeeText>
          </FeeContainer>
          <Box mt={4}>
            <ButtonRound onClick={onSubmit} disabled={isSubmitDisabled}>
              Next
            </ButtonRound>
          </Box>
        </FormContainer>
      </ModalLarge>
    </StyledModal>
  );
};
