import { Container } from './styles';
import closeImg from '../../assets/close.svg';
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
      <button
        type='button'
        onClick={onRequestClose}
        className='react-modal-close'
      >
        <img src={closeImg} alt='Close modal' />
      </button>

      <Container>
        <h2>Register transaction</h2>

        <input placeholder='Title' />

        <input type='number' placeholder='Value' />

        <input placeholder='Categorie' />

        <button type='submit'>Register</button>
      </Container>
    </Modal>
  );
}
