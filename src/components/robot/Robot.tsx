
const Robot = () => {
  return (
    <svg viewBox="0 0 200 160" style={{ width: '25vw', height: '25vw' }} xmlns="http://www.w3.org/2000/svg">
      {/* head */}
      <rect x="50" y="20" width="100" height="80" fill="#da7756" />
      {/* eyes */}
      <rect x="70" y="40" width="10" height="20" fill="white" />
      <rect x="120" y="40" width="10" height="20" fill="white" />
      {/* ears */}
      <rect x="31" y="50" width="20" height="20" fill="#da7756" />
      <rect x="149" y="50" width="20" height="20" fill="#da7756" />
      {/* legs */}
      <rect x="50" y="100" width="15" height="30" fill="#da7756" />
      <rect x="70" y="100" width="15" height="30" fill="#da7756" />
      <rect x="135" y="100" width="15" height="30" fill="#da7756" />
      <rect x="115" y="100" width="15" height="30" fill="#da7756" />
    </svg>
  )
}

export default Robot