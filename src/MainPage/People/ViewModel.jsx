import { useCallback, useState } from "react";
import PropTypes from "prop-types";

export function viewModel({
  departemencheckbox,
  nama,
  email,
  status,
  groupId,
  jabatanId,
  username,
}) {
  const userData = JSON.parse(localStorage.getItem("myCat"));

  const [groups, setGroups] = useState([]);
  const [depts, setDepts] = useState([]);
  const [jabatans, setJabatans] = useState([]);

  const sumbmitAdd = useCallback(async () => {
    apiFetch(
      `/save_user?` + new URLSearchParams({ token: userData.token }).toString(),
      {
        method: "POST",
        //  mode: "no-cors",
        //credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },

        body: JSON.stringify({
          username: username,
          nama: nama,
          email: email,
          status: status,
          group_id: groupId,
          dept_id: departemencheckbox,
          jabatan_id: jabatanId,
        }),
      }
    )
      .then((response) => {
        setStatusres(response);
        return response.json();
        // Ini response network
      })
      // console.log(status)
      .then((data) => {
        setDataaja(data);
        if (data.status === 1) {
          history.push("/dream-pos/users/userlists");

          // sessionStorage.setItem("tokencmis", datas.token);

          // console.log(sessionStorage.getItem('tokenc mis'));
          alertify.set("notifier", "position", "bottom-right");
          alertify.message("User Berhasil Ditambahkan.");
          return;
        } else {
          data.status === 0;
          history.push("/dream-pos/people/adduser-people");
          alertify.set("notifier", "position", "bottom-right");
          alertify.message("User ada.");

          return;
        }
      });
  }, []);

  const getGroups = useCallback(async () => {
    const url =
      "http://192.168.31.149:8080/show_group?" +
      new URLSearchParams({ token: userData.token }).toString();
    const result = await fetch(url).then((response) => {
      return response.json();
    });

    setGroups(result.listgroup);
  }, []);

  const getDepts = useCallback(async () => {
    const url =
      "http://192.168.31.149:8080/show_dept?" +
      new URLSearchParams({ token: userData.token }).toString();
    const result = await fetch(url).then((response) => {
      return response.json();
    });

    setDepts(result.listdept);
  }, []);

  const getJabatan = useCallback(
    async (departemencheckbox) => {
      const url =
        "http://192.168.31.149:8080/show_jabatan?" +
        new URLSearchParams({ token: userData.token }) +
        "&" +
        new URLSearchParams({ dep_id: departemencheckbox }).toString();

      const result = await fetch(url).then((response) => {
        return response.json();
      });
      setJabatans(result.listjabatan);
    },
    [departemencheckbox]
  );

  const groupArrays = groups?.map((list, index) => {
    return {
      id: list.id,
      text: list.id + list.nama,
    };
  });

  const departemenArrays = depts?.map((deptlist, index) => {
    return {
      id: deptlist.id,
      text: deptlist.nama,
    };
  });

  const jabatanArrays = jabatans?.map((jabatanlist, index) => {
    return {
      id: jabatanlist.id,
      text: jabatanlist.nama,
    };
  });

  return {
    data: {
      groups,
      depts,
      jabatans,
      groupArrays,
      departemenArrays,
      jabatanArrays,
    },
    method: {
      sumbmitAdd,
      getGroups,
      getDepts,
      getJabatan,
    },
  };
}

viewModel.propTypes = {
  departemencheckbox: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  nama: PropTypes.string,
  status: PropTypes.string,
  groupId: PropTypes.string,
  jabatanId: PropTypes.string,
};
