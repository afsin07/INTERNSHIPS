function StudentProfile(props) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        width: "300px",
        margin: "20px auto",
        textAlign: "center",
        backgroundColor: "white",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      <img
        src={props.image}
        alt={props.name}
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
        }}
      />

      <h2>{props.name}</h2>

      <p><strong>Department:</strong> {props.department}</p>

      <p><strong>Year:</strong> {props.year}</p>

      <p><strong>Skills:</strong> {props.skills}</p>
    </div>
  );
}

export default StudentProfile;