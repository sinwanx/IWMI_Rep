import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addInfluencer } from '../../actions/influencerActions';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const AddInfluencer = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInfluencer = {
      name,
      category,
      rating,
    };
    dispatch(addInfluencer(newInfluencer));
    history.push('/influencers');
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Add Influencer</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <div>
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;
                  return (
                    <label key={i}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                      />
                      <FaStar
                        className="star"
                        color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                        size={30}
                      />
                    </label>
                  );
                })}
              </div>
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Influencer
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddInfluencer;
