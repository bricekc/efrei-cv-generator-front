import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { UserContext } from '@/context/UserContext';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '@/components/ui/input';

const VITE_BACK_URL =
  import.meta.env.VITE_BACK_URL || 'http://localhost:3000/api';

function AllCVs() {
  const { user } = useContext(UserContext);
  const [cvsData, setCvsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCVs, setFilteredCVs] = useState([]);

  useEffect(() => {
    async function getCvs() {
      try {
        const response = await fetch(`${VITE_BACK_URL}/cv`);

        if (!response.ok) {
          throw new Error('Failed to cv');
        }

        const data = await response.json();
        const filteredData = data.filter((cv) => cv.user._id !== user.id);
        setCvsData(filteredData);
        setFilteredCVs(filteredData);
      } catch (error) {
        toast.error('Cv error:', error);
      }
    }
    getCvs();
  }, [user.id]);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = cvsData.filter((cv) =>
      cv.name.toLowerCase().includes(searchValue)
    );
    setFilteredCVs(filtered);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full"
        />
      </div>
      <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredCVs.map((data, index) => (
          <Link key={index} to={`/cv/${data?._id}`}>
            <Card className="hover:shadow-lg">
              <CardHeader>
                <CardTitle>{data?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-2">
                  {data?.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllCVs;
