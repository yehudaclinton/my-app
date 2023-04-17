import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

function SponsorCard({ sponsor }) {
  const teamMembers = JSON.parse(sponsor.team_members ?? "[]");
  const ceo = teamMembers.find((member) => member.jobtitle === "CEO");

  return (
    <div className="sponsor-card-wrapper">
      <Card className="sponsor-card">
        <Card.Title className="card-title">
          <span className="sponsor-type">{sponsor.sponsor_type} Partner</span>
        </Card.Title>
        <div className="row no-gutters">
          <div className="col-md-8">
            <Card.Body>
            <div className="col-md-4">
              <Card className="sponsor-image-card">
                <Card.Img src={sponsor.logo_url} alt={`\\\\\${sponsor.name} (logo)`} />
              </Card>
            </div>
              <Card.Text>{sponsor.description}</Card.Text>
              <Button className="btn-custom" href={sponsor.website_url}>
                Visit Website <FontAwesomeIcon icon={faAngleDoubleRight} />
              </Button>
            </Card.Body>
          </div>
          <div className="col-md-4">
            {ceo && ceo.headshot_url && (
              <img
                src={ceo.headshot_url}
                width="100" height="100"
                alt={`\\\\\${ceo.name} (CEO)`}
                className="img-fluid sponsor-headshot"
              />
            )}
            {ceo && (<span>{ceo.firstname} {ceo.lastname}</span>)}
          </div>
        </div>
      </Card>
    </div>
  );
}


function App() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://youngstartup.io/api/cwebsite/get_sponsors");
        const data = await response.json();
        console.log(data);
        setSponsors(data ?? []);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {sponsors.map((sponsorType) => (
          <div key={sponsorType.name}>
            {sponsorType.values.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
