const ForgotPassword = () => {
    return (
      <div className="form-container">
        <form className="inner-container">
          <h2 className="form-title">Recover Password</h2>
  
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              placeholder="doe@gmail.com"
            />
          </div>
  
          <div className="form-group">
            <label>Code</label>
            <input
              className="form-control"
              type="text"
              name="code"
              placeholder="123456"
            />
          </div>
  
          <div className="form-group">
            <label>New Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="***********"
            />
          </div>
  
          <div className="form-group">
            <input className="button" type="submit" value="Send" />
          </div>
        </form>
      </div>
    );
  };
  
  export default ForgotPassword;
  