import { samples } from '../data/samples';

export default {
  showToast: {
    type: 'boolean',
    default: false,
  },
  toastMessage: {
    type: 'any',
    default: '',
  },
  connectedClients: {
    type: 'integer',
    min: 0,
    max: 1e9,
    default: 0,
  },
};