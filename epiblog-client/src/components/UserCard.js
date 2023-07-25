import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="rounded-circle overflow-hidden mx-auto mt-3" style={{ width: '200px', height: '200px' }}>
        <img src={user.imageUrl} className="w-100 h-100" alt="User" />
      </div>
      <div className="card-body">
        <h5 className="card-title text-center">{user.firstName} {user.lastName}</h5>
        <h6 className="card-subtitle mb-2 text-muted text-center">{user.email}</h6>
        <p className="card-text">Role: {user.role}</p>
        <p className="card-text">Age: {user.age}</p>
      </div>
    </div>
  );
};

export default UserCard;

