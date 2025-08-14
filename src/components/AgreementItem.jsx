import { useState } from "react";
import {
  Container,
  TopRow,
  CheckBox,
  LabelArea,
  Required,
  AgreementBody,
  ToggleText,
} from "../styles/AgreementSection.styles"; import { CiCircleCheck } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";

export default function AgreementItem({ id, label, required, checked, onToggle, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container tabIndex={-1}>
      <TopRow>
        <LabelArea>
          <span>{label}</span>
          {required && <Required>*</Required>}
        </LabelArea>

        {children && (
          <ToggleText onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "약관 닫기" : "약관 보기"}
          </ToggleText>
        )}

        <CheckBox onClick={() => onToggle(id)}>
          {checked ? (
            <CiCircleCheck size={24} color="#FACD2B" />
          ) : (
            <CiCircleCheck size={24} color="#AEAEAE" />
          )}
        </CheckBox>
      </TopRow>

      <AnimatePresence initial={false}>
        {isOpen && children && (
          <motion.div
            key="agreement-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <AgreementBody>
              {children}
            </AgreementBody>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}