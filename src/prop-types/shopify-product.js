import { PropTypes } from 'react';

export default PropTypes.shape({
  available: PropTypes.bool.isRequired,
  body_html: PropTypes.string.isRequired,
  product_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
  })),
  variants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    available: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired, // This is actually the 'year'
    price: PropTypes.string.isRequired,
    formatted_price: PropTypes.string.isRequired,
  })).isRequired,
});
