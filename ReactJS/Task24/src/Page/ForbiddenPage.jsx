const ForbiddenPage = () => (
  <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
    <h1>Forbidden</h1>
    <p>You do not have access to this resource.</p>
    <button onClick={() => window.history.back()}>Go Back</button>
  </div>
);

export default ForbiddenPage;
