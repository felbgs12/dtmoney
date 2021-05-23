import { Container } from './styles';
import Modal from 'react-modal';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <Container>
        <input placeholder='Title' />

        <input type='number' placeholder='Value' />

        <input placeholder='Categorie' />

        <button type='submit'>Register</button>
      </Container>
    </Modal>
  );
}
