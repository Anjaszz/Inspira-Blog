const VerifyUser = () => {
  return (
    <div>
      <button className="button button-block">Go Back</button>
      <button className="button button-block">Send verification code</button>

      <div className="form-container">
        <form className="inner-container">
          <h2 className="form-title">Verify User</h2>
          <div className="form-group">
            <label>Confirmation code</label>
            <input
              className="form-control"
              type="text"
              name="code"
              placeholder="789654"
            />
          </div>

          <div className="form-group">
            <input className="button" type="submit" value="Verify" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyUser;
