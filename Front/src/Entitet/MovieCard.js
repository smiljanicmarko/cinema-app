import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const MovieCard = ({ movie }) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{movie.name}</Card.Title>
                <Card.Text>
                    <strong>Genres:</strong> {movie.genres}<br />
                    <strong>Duration:</strong> {movie.duration}<br />
                    <strong>Country:</strong> {movie.country}<br />
                    <strong>Year:</strong> {movie.year}<br />
                    <strong>Distributor:</strong> {movie.distributor}<br />
                </Card.Text>
                <Button>Details</Button>
            </Card.Body>
        </Card>
    );
}

export default MovieCard;