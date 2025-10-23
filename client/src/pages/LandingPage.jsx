import { Link } from "react-router-dom";


function LandingPage() {
  return (
	<div>
		<div>
			<nav>
				<h1>MYP</h1>
				<div>
					<Link to="/login">
						<button>Login</button>
					</Link>
					<Link to="/signup">
						<button>Signup</button>
					</Link>
				</div>

			</nav>
		</div>
		<div>
			<div>
				<p>CREATE.</p>
				<p>GROW YOUR CAREER.</p>
				<p>Build a stunning portfolio with Make Your Portfolio — and unlock your full career potential.</p>
			</div>

			<div>
				<img src="" alt="" />
			</div>


			<div>
				<Link to="/signup">
					<button>Sign Up for free</button>
				</Link>

				<Link to="/login">
					<button >Login</button>
				</Link>

			</div>
			

		</div>
	</div>
  );
}

export default LandingPage;