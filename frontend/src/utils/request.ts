export const fetchGET = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data with params:', error);
    throw error;
  }
};

export const fetchPOST = async <T, R>(url: string, body: T): Promise<R> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const fetchFile = async <T>(url: string, body: FormData): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: body,
    });

    console.log(response);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error posting file data:', error);
    throw error;
  }
};

export const fetchPATCH = async <T, R>(
  url: string,
  id: string,
  body: T
): Promise<R> => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error patching data:', error);
    throw error;
  }
};

export const fetchDELETE = async <T>(url: string, id: string): Promise<T> => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};
