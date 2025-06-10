class UserPublicDTO {
  constructor(user) {
    this._id = user._id;
    this.email = user.email;
    this.role = user.role;
  }
}

export default UserPublicDTO;
