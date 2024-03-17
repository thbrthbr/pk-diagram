import styled from 'styled-components';
import react, { useEffect, useState, useRef } from 'react';
import { toPng, toSvg, toJpeg } from 'html-to-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { IoDownloadOutline } from 'react-icons/io5';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { CiSearch } from 'react-icons/ci';
import { FaSortNumericDown } from 'react-icons/fa';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { categoryData, db } from './PKDB';
import Select from 'react-select';
import { MdOutlineEmail } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { RiFileSearchLine } from 'react-icons/ri';
import { TbHttpDelete } from 'react-icons/tb';
import { GrDocumentTxt } from 'react-icons/gr';
import { GrDocumentUpload } from 'react-icons/gr';
import { PropagateLoader } from 'react-spinners';

const Tiermaker = () => {
  let option = [
    { value: 'All', label: <AiOutlineOrderedList /> },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
  ];

  let dbSet = db.map((x, i) => {
    return { img: x.url, id: i, name: x.name + ':' + x.nameKo };
  });
  const colorDatabase = [
    '#EDEDED',
    '#ED1C24',
    '#ED5901',
    '#ED9C02',
    '#EDD304',
    '#CFED04',
    '#87ED02',
    '#2FEB01',
    '#05ED9C',
    '#04EDE2',
    '#04BFED',
    '#0489ED',
    '#0226ED',
    '#6802ED',
    '#9500EC',
    '#DB00ED',
    '#ED00A5',
    '#616161',
  ];
  const [tierList, setTierList] = useState([
    { id: ':' + Date.now(), contentArr: [] },
  ]);
  const [selectedItem, setSelectedItem] = useState('');
  const [previousPlace, setPreviousPlace] = useState('');
  const [showTest, setShowTest] = useState(false);
  const [testArr, setTestArr] = useState([]);
  const [imgSet, setImgSet] = useState(dbSet.slice());
  const [godown, setGodown] = useState(0);
  const [goleft, setGoleft] = useState(0);
  const [search, setSearch] = useState('');
  const [loadDatas, setLoadDatas] = useState([]);
  const [currentTextArea, setCurrentTextArea] = useState('0');
  const [question, setQuestion] = useState(false);
  const [guideLang, setGuideLang] = useState('korean');
  const [uploadHandler, setUploadHandler] = useState(false);
  const [coverHeight, setCoverHeight] = useState(0);
  const [resize, setResize] = useState(0);
  const [nameChanged, setNameChanged] = useState(0);

  const belowRef = useRef(null);
  const threadRef = useRef(null);
  const isMounted = useRef(false);
  const isMounted2 = useRef(false);
  const isMounted3 = useRef(false);
  const draggingItemIndex = useRef(null);
  const draggingOverItemIndex = useRef(null);
  const topRef = useRef(null);
  const elementRef = useRef(null);
  const coverRef = useRef(null);
  const realDownloadRef = useRef(null);
  const searchRef = useRef(null);

  const addTier = () => {
    setTierList([...tierList, { id: ':' + Date.now(), contentArr: [] }]);
    setGodown(godown + 1);
  };

  const subTier = (key) => {
    if (tierList.length <= 1) {
      alert('최소 한 칸은 존재해야 합니다 \nAt least one line is required');
      return;
    }
    let willyou = window.confirm('티어라인을 삭제하시겠습니까? \nDelete line?');
    if (willyou) {
      const copy = [];
      let dyingList = [];
      for (let i = 0; i < tierList.length; i++) {
        if (i !== key) copy.push(tierList[i]);
        else {
          for (let j = 0; j < tierList[i].contentArr.length; j++) {
            dyingList.push(tierList[i].contentArr[j]);
          }
        }
      }
      const saver = [];
      for (let i = 0; i < dyingList.length; i++) {
        saver.push({
          img: dyingList[i].img,
          id: dyingList[i].id,
          name: dyingList[i].name,
        });
      }
      setImgSet([...saver, ...imgSet]);
      setTierList(copy);
      setNameChanged(Date.now());
    }
  };

  const sorter = () => {
    let sorted = imgSet.slice();
    sorted = sorted.sort((x, y) => x.id - y.id);
    let newTierList = [];
    for (let i = 0; i < tierList.length; i++) {
      let childSorted = tierList[i].contentArr.slice();
      childSorted = childSorted.sort((x, y) => x.id - y.id);
      let newTierObj = { id: tierList[i].id, contentArr: childSorted };
      newTierList.push(newTierObj);
    }
    setTierList(newTierList);
    setImgSet(sorted);
  };

  const exportElementAsPNG2 = () => {
    document.querySelector('#top').scrollIntoView();
    if (coverRef.current && realDownloadRef.current) {
      if (elementRef.current) {
        coverRef.current.style.height = coverHeight + 'px';
        coverRef.current.style.display = 'flex';
        realDownloadRef.current.style.display = 'block';
        let saveDisplay = '';
        let saveBorder = '';
        let saveWidth = '';
        var matches = document.getElementsByClassName('toggle');
        for (let i = 0; i < matches.length; i++) {
          matches[i].style.visibility = 'hidden';
        }
        let mob1 = document.getElementsByClassName('forMob1');
        let mob2 = document.getElementsByClassName('forMob2');
        saveDisplay = mob1[0].style.display;
        saveBorder = mob1[0].style.border;
        saveWidth = mob2[0].style.width;
        for (let i = 0; i < mob1.length; i++) {
          mob1[i].style.display = 'flex';
          mob1[i].style.border = '1px black solid';
          mob2[i].style.width = '120px';
        }
        let changer = document.getElementsByClassName('nameLine');
        for (let i = 0; i < changer.length; i++) {
          let target = changer[i];
          target.style.height = '1px';
          target.style.height = target.scrollHeight + 'px';
        }
        coverRef.current.style.width = '100vw';
        elementRef.current.style.width = '1450px';
        toPng(elementRef.current).then((image2) => {
          realDownloadRef.current.children[0].src = image2;
          realDownloadRef.current.children[0].width = 800;
          realDownloadRef.current.children[0].addEventListener(
            'load',
            () => {
              // setTimeout(() => {
              toPng(realDownloadRef.current.children[0]).then((image3) => {
                let canvas = document.createElement('canvas');
                let img1 = new Image();
                img1.src = image3;
                img1.onload = () => {
                  canvas.width = realDownloadRef.current.children[0].width;
                  canvas.height = realDownloadRef.current.children[0].height;
                  canvas
                    .getContext('2d')
                    .drawImage(
                      img1,
                      0,
                      0,
                      realDownloadRef.current.children[0].width,
                      realDownloadRef.current.children[0].height,
                    );
                  var dataURL = canvas.toDataURL('image/png');
                  const a = document.createElement('a');
                  a.href = dataURL;
                  a.download = 'tierlist.png';
                  a.click();
                  elementRef.current.style.width = '90vw';
                  for (let i = 0; i < matches.length; i++) {
                    matches[i].style.visibility = 'visible';
                  }
                  for (let i = 0; i < mob1.length; i++) {
                    mob1[i].style.display = saveDisplay;
                    mob1[i].style.border = saveBorder;
                    mob2[i].style.width = saveWidth;
                  }
                  realDownloadRef.current.style.display = 'none';
                  realDownloadRef.current.children[0].src = '';
                  coverRef.current.style.width = 'auto';
                  coverRef.current.style.display = 'none';
                  let changer = document.getElementsByClassName('nameLine');
                  for (let i = 0; i < changer.length; i++) {
                    let target = changer[i];
                    target.style.height = '1px';
                    target.style.height = target.scrollHeight + 'px';
                  }
                };
              });
              // }, 1000);
            },
            { once: true },
          );
        });
      }
    }
  };

  const back = (id) => {
    if (!selectedItem) return;
    if (id == selectedItem.id) return;
    let isExsist = [];
    for (let i = 0; i < imgSet.length; i++) {
      isExsist.push(imgSet[i].id);
    }
    // 티어스레드에 다시 두는 작업
    if (!isExsist.includes(selectedItem.id)) {
      let renew = [];
      for (let i = 0; i < imgSet.length; i++) {
        if (imgSet[i].id !== selectedItem.id) {
          renew.push(imgSet[i]);
        }
        if (imgSet[i].id === id) {
          renew.push({
            id: selectedItem.id,
            img: selectedItem.img,
            name: selectedItem.name,
          });
        }
      }
      setImgSet(renew);
    } else {
      const index1 = imgSet.findIndex((obj) => obj.id == id);
      const index2 = imgSet.findIndex((obj) => obj.id == selectedItem.id);
      let renew = [];
      for (let i = 0; i < imgSet.length; i++) {
        if (imgSet[i].id !== selectedItem.id) {
          if (imgSet[i].id === id) {
            if (index1 > index2) {
              renew.push(imgSet[i]);
              renew.push({
                id: selectedItem.id,
                img: selectedItem.img,
                name: selectedItem.name,
              });
            } else {
              renew.push({
                id: selectedItem.id,
                img: selectedItem.img,
                name: selectedItem.name,
              });
              renew.push(imgSet[i]);
            }
          } else {
            renew.push(imgSet[i]);
          }
        }
      }

      setImgSet(renew);
    }
    // 티어라인에서 제외하는 작업
    let bigOne = [];
    let set = tierList.slice(0);
    for (let i = 0; i < set.length; i++) {
      let smallOne = [];
      for (let j = 0; j < set[i].contentArr.length; j++) {
        if (set[i].contentArr[j].id !== selectedItem.id) {
          smallOne.push(set[i].contentArr[j]);
        }
      }
      bigOne.push({ id: set[i].id, contentArr: smallOne });
    }
    setTierList(bigOne);
    setSelectedItem('');
  };

  const backToEmpty = (e) => {
    if (e.target.id !== 'thread') return;
    let isExsist = [];
    for (let i = 0; i < imgSet.length; i++) {
      isExsist.push(imgSet[i].id);
    }
    if (!isExsist.includes(selectedItem.id)) {
      setImgSet([
        ...imgSet,
        { id: selectedItem.id, img: selectedItem.img, name: selectedItem.name },
      ]);
    } else {
      let renew = imgSet;
      const index1 = renew.findIndex((obj) => obj.id == selectedItem.id);
      let temp = renew[index1];
      renew.splice(index1, 1);
      renew.push(temp);
    }
    let bigOne = [];
    let set = tierList.slice(0);
    for (let i = 0; i < set.length; i++) {
      let smallOne = [];
      for (let j = 0; j < set[i].contentArr.length; j++) {
        if (set[i].contentArr[j].id !== selectedItem.id) {
          smallOne.push(set[i].contentArr[j]);
        }
      }
      bigOne.push({ id: set[i].id, contentArr: smallOne });
    }
    setTierList(bigOne);
    setSelectedItem('');
  };

  const backMobile = (id) => {
    // console.log(selectedItem);
    if (!selectedItem.id) {
      if (selectedItem.id !== 0) {
        return;
      }
    }
    // console.log('?');
    if (id == selectedItem.id) return;
    let copy = tierList.slice();
    let isback = false;
    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy[i].contentArr.length; j++) {
        if (copy[i].contentArr[j].id == selectedItem.id) {
          copy[i].contentArr.splice(j, 1);
          isback = true;
          setTierList(copy);
          break;
        }
      }
      if (isback) break;
    }
    const index1 = imgSet.findIndex((obj) => obj.id == id);
    let index2;
    if (isback == false) {
      index2 = imgSet.findIndex((obj) => obj.id == selectedItem.id);
    }
    let renew = [];
    for (let i = 0; i < imgSet.length; i++) {
      if (i == index1) {
        if (isback == true) {
          renew.push(selectedItem);
          renew.push(imgSet[i]);
        } else {
          if (index1 < index2) {
            renew.push(selectedItem);
            renew.push(imgSet[i]);
          } else {
            renew.push(imgSet[i]);
            renew.push(selectedItem);
          }
        }
      } else {
        if (imgSet[i].id !== selectedItem.id) {
          renew.push(imgSet[i]);
        }
      }
    }
    setImgSet(renew);
  };

  const backEmptyMobile = () => {
    let copy = tierList.slice();
    let isback = false;
    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy[i].contentArr.length; j++) {
        if (copy[i].contentArr[j].id == selectedItem.id) {
          copy[i].contentArr.splice(j, 1);
          isback = true;
          setTierList(copy);
          break;
        }
      }
      if (isback) break;
    }
    let copyThread = imgSet.slice();
    if (isback == false) {
      for (let i = 0; i < copyThread.length; i++) {
        if (copyThread[i].id == selectedItem.id) {
          copyThread.splice(i, 1);
          break;
        }
      }
    }
    copyThread.push(selectedItem);
    setImgSet(copyThread);
  };

  const drop = (e) => {
    if (!selectedItem) return;
    let newData = tierList.slice(0);
    let set = [];
    let changed = false;
    let allow = false;
    for (let i = 0; i < newData.length; i++) {
      // 드롭하는 티어를 티어리스트에서 고르기
      if (newData[i].id == e.target.id) {
        for (let j = 0; j < newData[i].contentArr.length; j++) {
          // 같은 티어내에서 빈공간에 이동 처리
          if (newData[i].contentArr[j].id == selectedItem.id) {
            newData[i].contentArr.splice(j, 1);
            allow = true;
          }
        }
        let save = [...newData[i].contentArr, selectedItem];
        let packager = { ...tierList[i], contentArr: save };
        set.push(packager);
      } else {
        // 드롭하는 티어가 아닌 경우
        // 드롭하는 티어도 아니며 요소 위에다 두는데 그 요소의 부모가 드롭하는 티어의 경우
        if (e.target.parentNode.id == newData[i].id) {
          let flag = true;
          for (let j = 0; j < newData[i].contentArr.length; j++) {
            // 같은 티어 내에서 어떠한 요소 위에 두는데 그게 자신이면 제자리 이동 아니면 서로 이동
            if (newData[i].contentArr[j].id == selectedItem.id) {
              // 이건 해당 티어에 자신이 존재하는지 찾는 것
              let cloner = [...newData[i].contentArr];
              let changer1 = -1;
              let changer2 = -1;
              for (let a = 0; a < cloner.length; a++) {
                if (cloner[a].id == e.target.id) changer1 = a;
                else if (cloner[a].id == selectedItem.id) changer2 = a;
              }
              if (changer1 !== -1 && changer2 !== -1) {
                let theTarget = cloner[changer2];
                cloner.splice(changer2, 1);
                cloner.splice(changer1, 0, theTarget);
              }
              let packager = {
                ...tierList[i],
                contentArr: cloner,
              };
              set.push(packager);
              flag = false;
              changed = true;
            }
          }
          if (flag === true) {
            let save = [...newData[i].contentArr, selectedItem];
            let packager = { ...tierList[i], contentArr: save };
            set.push(packager);
          }
        } else {
          set.push(newData[i]);
        }
      }
    }
    let bigOne = [];
    for (let i = 0; i < set.length; i++) {
      let smallOne = [];
      for (let j = 0; j < set[i].contentArr.length; j++) {
        if (
          set[i].contentArr[j].id == selectedItem.id &&
          set[i].id == previousPlace &&
          changed == false
        ) {
          if (allow == true) {
            smallOne.push(set[i].contentArr[j]);
          }
        } else {
          smallOne.push(set[i].contentArr[j]);
        }
      }
      bigOne.push({ id: set[i].id, contentArr: smallOne });
    }
    let set2 = [];
    for (let i = 0; i < imgSet.length; i++) {
      if (imgSet[i].id !== selectedItem.id) {
        set2.push(imgSet[i]);
      }
    }
    setImgSet(set2);
    setTierList(bigOne);
    setSelectedItem('');
    setPreviousPlace('');
  };

  const dropMobile = (e) => {
    try {
      // const body = document.getElementsByTagName('body')[0];
      const body = document.getElementsByClassName('App')[0];
      body.style.overflow = 'auto';
      if (threadRef.current) {
        threadRef.current.style.overflowX = 'auto';
      }
      if (!e.classList.contains('onlyhere')) return;
      if (e.classList.contains('thread')) {
        backEmptyMobile(e);
        setSelectedItem('');
        return;
      }
      if (e.classList.contains('threadImg')) {
        backMobile(e.id);
        setSelectedItem('');
        return;
      }
      if (selectedItem) {
        let newData = tierList.slice(0);
        let set = [];
        let changed = false;
        let allow = false;
        // let movedOne = selectedItem;
        for (let i = 0; i < newData.length; i++) {
          // 드롭하는 티어를 티어리스트에서 고르기
          if (newData[i].id == e.id) {
            for (let j = 0; j < newData[i].contentArr.length; j++) {
              // 같은 티어내에서 빈공간에 두는 제자리 이동
              if (newData[i].contentArr[j].id == selectedItem.id) {
                newData[i].contentArr.splice(j, 1);
                allow = true;
              }
            }
            let save = [...newData[i].contentArr, selectedItem];
            let packager = { ...tierList[i], contentArr: save };
            set.push(packager);
          } else {
            // 드롭하는 티어가 아닌 경우
            // 드롭하는 티어도 아니며 요소 위에다 두는데 그 요소의 부모가 드롭하는 티어의 경우
            if (e.parentNode.id == newData[i].id) {
              let flag = true;
              for (let j = 0; j < newData[i].contentArr.length; j++) {
                // 같은 티어 내에서 어떠한 요소 위에 두는데 그게 자신이면 제자리 이동 아니면 서로 이동
                if (newData[i].contentArr[j].id == selectedItem.id) {
                  // 이건 해당 티어에 자신이 존재하는지 찾는 것
                  let cloner = [...newData[i].contentArr];
                  let changer1 = -1;
                  let changer2 = -1;
                  for (let a = 0; a < cloner.length; a++) {
                    if (cloner[a].id == e.id) changer1 = a;
                    else if (cloner[a].id == selectedItem.id) changer2 = a;
                  }
                  if (changer1 !== -1 && changer2 !== -1) {
                    let theTarget = cloner[changer2];
                    cloner.splice(changer2, 1);
                    cloner.splice(changer1, 0, theTarget);
                  }
                  let packager = {
                    ...tierList[i],
                    contentArr: cloner,
                  };
                  set.push(packager);
                  flag = false;
                  changed = true;
                }
              }
              if (flag === true) {
                let save = [...newData[i].contentArr, selectedItem];
                let packager = { ...tierList[i], contentArr: save };
                set.push(packager);
              }
            } else {
              set.push(newData[i]);
            }
          }
        }
        let bigOne = [];
        for (let i = 0; i < set.length; i++) {
          let smallOne = [];
          for (let j = 0; j < set[i].contentArr.length; j++) {
            if (
              set[i].contentArr[j].id == selectedItem.id &&
              set[i].id == previousPlace &&
              changed == false
            ) {
              if (allow == true) {
                smallOne.push(set[i].contentArr[j]);
              }
            } else {
              smallOne.push(set[i].contentArr[j]);
            }
          }
          bigOne.push({ id: set[i].id, contentArr: smallOne });
        }

        //티어스레드에서 이미지 삭제하는 작업
        let set2 = [];
        for (let i = 0; i < imgSet.length; i++) {
          if (imgSet[i].id !== selectedItem.id) {
            set2.push(imgSet[i]);
          }
        }
        setImgSet(set2);
        setTierList(bigOne);
        setSelectedItem('');
        setPreviousPlace('');
      }
    } catch (e) {}
  };

  const searchOne = (e) => {
    if (e.key == 'Enter') {
      if (searchRef.current) {
        searchRef.current.blur();
      }
      let flag = false;
      let searchedList = [];
      for (let i = 0; i < imgSet.length; i++) {
        if (imgSet[i].name.toLowerCase().includes(search.toLowerCase())) {
          searchedList.push(imgSet[i].name.toLowerCase());
          flag = true;
        }
      }
      if (flag == false) {
        alert(
          "존재하지 않는 이름이거나 이미 사용한 이름입니다. \nName doesn't exsist or already used.",
        );
        setSearch('');
      } else {
        let searchedListTask = imgSet.slice();
        let renew = [];
        let front = [];
        for (let i = 0; i < searchedListTask.length; i++) {
          if (!searchedList.includes(searchedListTask[i].name.toLowerCase())) {
            renew.push(searchedListTask[i]);
          } else {
            front.push(searchedListTask[i]);
          }
        }
        setImgSet([...front, ...renew]);
        setSearch('');
        setGoleft(goleft + 1);
      }
    }
  };

  const generationChanger = (e) => {
    let copy = dbSet.slice();
    let renew = [];
    let used = [];
    for (let i = 0; i < tierList.length; i++) {
      for (let j = 0; j < tierList[i].contentArr.length; j++) {
        used.push(tierList[i].contentArr[j].name);
      }
    }
    if (e.value == 'All') {
      for (let i = 0; i < 1342; i++) {
        if (!used.includes(copy[i].name)) renew.push(copy[i]);
      }
      setImgSet(renew);
    } else if (e.value == 1) {
      for (let i = 1; i < 211; i++) {
        if (!used.includes(copy[i].name)) renew.push(copy[i]);
      }
      setImgSet(renew);
    } else if (e.value == 2) {
      for (let i = 211; i < 350; i++) {
        if (!used.includes(copy[i].name)) renew.push(copy[i]);
      }
      setImgSet(renew);
    } else if (e.value == 3) {
      for (let i = 350; i < 515; i++) {
        if (!used.includes(copy[i].name)) renew.push(copy[i]);
      }
      setImgSet(renew);
    } else if (e.value == 4) {
      for (let i = 515; i < 660; i++) {
        if (!used.includes(copy[i].name)) renew.push(copy[i]);
      }
      setImgSet(renew);
    } else if (e.value == 5) {
      for (let i = 660; i < 850; i++) {
        if (!used.includes(copy[i].name)) renew.push(copy[i]);
      }
      setImgSet(renew);
    } else if (e.value == 6) {
      for (let i = 850; i < 981; i++) {
        if (!used.includes(copy[i].name)) renew.push(copy[i]);
      }
      setImgSet(renew);
    } else if (e.value == 7) {
      for (let i = 981; i < 1087; i++) {
        if (!used.includes(copy[i].name)) renew.push(copy[i]);
      }
      setImgSet(renew);
    } else if (e.value == 8) {
      for (let i = 1087; i < 1206; i++) {
        if (!used.includes(copy[i].name)) renew.push(copy[i]);
      }
      setImgSet(renew);
    } else if (e.value == 9) {
      for (let i = 1206; i < 1342; i++) {
        if (!used.includes(copy[i].name)) renew.push(copy[i]);
      }
      setImgSet(renew);
    }
    // 옵션은 더 추가할 수도 있음
  };

  const move = (id, direction) => {
    let copy = tierList.slice();
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].id == id) {
        let temp = copy[i];
        if (direction == 'up') {
          if (i == 0) return;
          let another = i - 1;
          let target = document.getElementById('' + i);
          let target2 = document.getElementById('' + another);
          let temp2 = target.style.height;
          copy[i] = copy[i - 1];
          copy[i - 1] = temp;
          target.style.height = target2.style.height;
          target2.style.height = temp2;
        } else {
          if (i + 1 == copy.length) return;
          let another = i + 1;
          let target = document.getElementById('' + i);
          let target2 = document.getElementById('' + another);
          let temp2 = target.style.height;
          copy[i] = copy[i + 1];
          copy[i + 1] = temp;
          target.style.height = target2.style.height;
          target2.style.height = temp2;
        }
        break;
      }
    }
    setTierList(copy);
  };

  const dbloader = () => {
    if (localStorage.getItem('namedb')) {
      let tierDatas = JSON.parse(localStorage.getItem('namedb'));
      let record = [];
      for (let i = 0; i < tierDatas.length; i++) {
        let option = { value: tierDatas[i], label: tierDatas[i] };
        record.push(option);
      }
      setLoadDatas(record);
    }
  };

  const saveData = () => {
    let prompt = window.prompt(
      '티어표의 이름을 정해주세요 \nName your tierlist',
    );
    while (prompt == 'namedb') {
      prompt = window.prompt(
        '다른 이름으로 정해주세요 \nPlease choose different name',
      );
    }
    if (!prompt) return;
    if (localStorage.getItem('namedb')) {
      let namedb = JSON.parse(localStorage.getItem('namedb'));
      for (let i = 0; i < namedb.length; i++) {
        if (namedb[i] == prompt) {
          let howyoudo;
          if (prompt == namedb[i]) {
            howyoudo = window.confirm(
              '같은 이름의 세이브 데이터에 덮어 씌우겠습니까? \nOverride on same name data?',
            );
          }
          if (!howyoudo) return;
          break;
        }
      }
      //   namedb.push(prompt);
      if (!namedb.includes(prompt)) {
        namedb.push(prompt);
      }
      localStorage.setItem('namedb', JSON.stringify(namedb));
      if (localStorage.getItem(prompt)) {
        localStorage.removeItem(prompt);
      }
      localStorage.setItem(prompt, JSON.stringify(tierList));
    } else {
      let namedb = [prompt];
      localStorage.setItem('namedb', JSON.stringify(namedb));
      localStorage.setItem(prompt, JSON.stringify(tierList));
    }
    dbloader();
  };

  const loadData = (e) => {
    let test = localStorage.getItem(e.value);
    let sortedData = JSON.parse(test);
    let used = [];
    for (let i = 0; i < sortedData.length; i++) {
      for (let j = 0; j < sortedData[i].contentArr.length; j++) {
        used.push(sortedData[i].contentArr[j].name);
      }
    }
    let renew = [];
    for (let i = 0; i < imgSet.length; i++) {
      if (!used.includes(imgSet[i].name)) {
        if (
          !used.includes(
            imgSet[i].name.split(':')[0] +
              'Form:' +
              imgSet[i].name.split(':')[1],
          )
        )
          renew.push(imgSet[i]);
      }
    }
    setImgSet(renew);
    setTierList(JSON.parse(test));
  };

  const deleteData = (e) => {
    let confirm = window.confirm(
      '해당 데이터를 삭제하시겠습니까? \nDelete this Data?',
    );
    if (confirm) {
      let namedb = JSON.parse(localStorage.getItem('namedb'));
      let newdb = [];
      let newLoadedData = [];
      for (let i = 0; i < namedb.length; i++) {
        if (namedb[i] !== e.value) {
          newdb.push(namedb[i]);
          newLoadedData.push({ value: namedb[i], label: namedb[i] });
        }
      }
      localStorage.removeItem('namedb');
      localStorage.removeItem(e.value);
      if (newdb.length > 0) {
        localStorage.setItem('namedb', JSON.stringify(newdb));
      }
      setLoadDatas(newLoadedData);
    }
  };

  const selectGuideLang = (e, lang) => {
    e.preventDefault();
    e.stopPropagation();
    setGuideLang(lang);
  };

  const downloadTXT = (e) => {
    let file = localStorage.getItem(e.value);
    const blob = new Blob([file], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = e.value;
    a.href = url;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 100);
  };

  const uploadTXT = () => {
    try {
      let file = document.createElement('input');
      file.type = 'file';
      file.addEventListener('change', () => {
        if (file.files[0].type !== 'text/plain') {
          alert('txt 파일만 올릴 수 있습니다 \nYou can only upload txt file');
          return;
        }
        const READER = new FileReader();
        READER.readAsText(file.files[0], 'UTF-8');
        let str = '';
        READER.onload = (e) => {
          try {
            str = e.target.result;
            let pasteData = JSON.parse(str);
            setTierList(JSON.parse(str));
            let copy = dbSet.slice();
            let renew = [];
            let used = [];
            for (let i = 0; i < pasteData.length; i++) {
              for (let j = 0; j < pasteData[i].contentArr.length; j++) {
                used.push(pasteData[i].contentArr[j].name);
              }
            }
            for (let i = 0; i < 1342; i++) {
              if (!used.includes(copy[i].name)) renew.push(copy[i]);
            }
            setImgSet(renew);
          } catch (e) {}
        };
      });
      file.click();
    } catch (e) {}
  };

  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (isMounted.current) {
      belowRef.current.scrollIntoView();
    } else {
      isMounted.current = true;
    }
  }, [godown]);

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTo(0, 0);
    }
  }, [goleft]);

  useEffect(() => {
    if (localStorage.getItem('namedb')) {
      dbloader();
    }
    window.addEventListener('resize', () => {
      setResize(window.innerWidth);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setResize(window.innerWidth);
      });
    };
  }, []);

  useEffect(() => {
    if (isMounted2.current) {
      let target = document.getElementById(currentTextArea.split(':')[0]);
      target.style.height = '1px';
      target.style.height = target.scrollHeight + 'px';
    } else {
      isMounted2.current = true;
    }
  }, [currentTextArea]);

  useEffect(() => {
    if (elementRef.current) {
      // console.log(elementRef.current.offsetHeight);
      setCoverHeight(elementRef.current.offsetHeight);
    }
  }, [tierList]);

  useEffect(() => {
    let changer = document.getElementsByClassName('nameLine');
    for (let i = 0; i < changer.length; i++) {
      let target = changer[i];
      target.style.height = '1px';
      target.style.height = target.scrollHeight + 'px';
    }
  }, [nameChanged]);

  useEffect(() => {
    if (isMounted3.current) {
      let changer = document.getElementsByClassName('nameLine');
      for (let i = 0; i < changer.length; i++) {
        let target = changer[i];
        target.style.height = '1px';
        target.style.height = target.scrollHeight + 'px';
      }
    } else {
      isMounted3.current = true;
    }
  }, [resize]);

  return (
    <$AllArea>
      <br></br>
      <$UpBar id="top">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'end',
            padding: '5px',
            fontSize: '20px',
            position: 'relative',
            textAlign: 'start',
          }}
        >
          <$GuidePlace>
            <FaRegQuestionCircle
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setQuestion(!question);
              }}
            />
            <$MailLink href="mailto:boyosagrance@gmail.com">
              <MdOutlineEmail
                style={{
                  fontSize: '10px',
                }}
              />{' '}
              <span
                style={{
                  fontSize: '10px',
                }}
              >
                boyosagrance@gmail.com
              </span>
            </$MailLink>
          </$GuidePlace>
          {question && (
            <$Guide
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <$GuideEachLine>
                  <span
                    style={{
                      fontWeight: guideLang == 'korean' ? 900 : 400,
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      selectGuideLang(e, 'korean');
                    }}
                  >
                    한국어
                  </span>{' '}
                  |{' '}
                  <span
                    style={{
                      fontWeight: guideLang == 'english' ? 600 : 400,
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      selectGuideLang(e, 'english');
                    }}
                  >
                    English
                  </span>
                </$GuideEachLine>
                <IoMdClose
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setQuestion(!question);
                  }}
                />
              </div>
              <$GuideEachLine></$GuideEachLine>
              <$GuideEachLine>
                <FontAwesomeIcon icon={faSave} /> :{' '}
                {guideLang == 'korean'
                  ? '데이터 저장 (브라우저 쿠키사용)'
                  : 'Save data (browser local storage)'}
              </$GuideEachLine>
              <$GuideEachLine>
                <RiFileSearchLine /> :{' '}
                {guideLang == 'korean' ? '데이터 불러오기' : 'Load data'}
              </$GuideEachLine>
              <$GuideEachLine>
                <TbHttpDelete /> :{' '}
                {guideLang == 'korean' ? '데이터 삭제' : 'Delete data'}
              </$GuideEachLine>
              <$GuideEachLine>
                <GrDocumentTxt /> :{' '}
                {guideLang == 'korean'
                  ? '티어표 데이터 txt 다운로드'
                  : 'Download Tierlist txt file'}
              </$GuideEachLine>
              <$GuideEachLine>
                <GrDocumentUpload /> :{' '}
                {guideLang == 'korean'
                  ? '티어표 데이터 txt 불러오기'
                  : 'Open Tierlist by txt file'}
              </$GuideEachLine>
              <$GuideEachLine>
                <FontAwesomeIcon icon={faPlus} /> :{' '}
                {guideLang == 'korean' ? '티어라인 추가' : 'Add tierline'}
              </$GuideEachLine>
              <$GuideEachLine>
                <FontAwesomeIcon icon={faTrash} /> :{' '}
                {guideLang == 'korean' ? '티어라인 삭제' : 'Subtract tierline'}
              </$GuideEachLine>
              <$GuideEachLine>
                <FaSortNumericDown /> :{' '}
                {guideLang == 'korean'
                  ? '도감번호순 정렬'
                  : 'Sort by dex order'}
              </$GuideEachLine>
              <$GuideEachLine>
                <AiOutlineOrderedList /> :{' '}
                {guideLang == 'korean' ? '세대별 분류' : 'Choose generation'}
              </$GuideEachLine>
              <$GuideEachLine>
                <IoDownloadOutline /> :{' '}
                {guideLang == 'korean'
                  ? '티어표 이미지 다운로드'
                  : 'Download Tierlist'}
              </$GuideEachLine>
            </$Guide>
          )}
        </div>
        <$UpbarBottonPlace>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <$CustomButton
              style={{
                width: '33%',
                //  minWidth: '80px'
              }}
              onClick={saveData}
            >
              <FontAwesomeIcon icon={faSave} />
            </$CustomButton>
            <$Select2
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  border: '2px solid black',
                  borderRadius: '10px',
                  fontSize: '10px',
                }),
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  color: 'black',
                  fontSize: '20px',
                }),
              }}
              placeholder={<RiFileSearchLine />}
              options={loadDatas}
              onChange={loadData}
            />
            <$Select2
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  border: '2px solid black',
                  borderRadius: '10px',
                  fontSize: '10px',
                }),
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  color: 'black',
                  fontSize: '20px',
                }),
              }}
              value=""
              placeholder={<TbHttpDelete />}
              options={loadDatas}
              onChange={deleteData}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <$Select3
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  border: '2px solid black',
                  borderRadius: '10px',
                  fontSize: '10px',
                }),
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  color: 'black',
                  fontSize: '20px',
                }),
              }}
              value=""
              placeholder={<GrDocumentTxt />}
              options={loadDatas}
              onChange={downloadTXT}
            />
            <$CustomButton
              style={{
                width: '50%',
                //  minWidth: '80px'
              }}
              onClick={uploadTXT}
            >
              <GrDocumentUpload />
            </$CustomButton>
          </div>
        </$UpbarBottonPlace>
      </$UpBar>
      <$TierContainer>
        <div
          style={{
            width: '100vw',
            display: 'none',
            position: 'absolute',
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          ref={realDownloadRef}
        >
          <img
            style={{
              width: '800px',
              // 용량이 너무 커지면 이걸 줄이자
            }}
            src={''}
          ></img>
        </div>
        <div
          ref={coverRef}
          style={{
            display: 'none',
            position: 'absolute',
            width: '91vw',
            height: '100vh',
            zIndex: 2,
            flexDirection: 'column',
            backgroundColor: 'aliceblue',
            justifyContent: 'start',
            alignItems: 'start',
          }}
        >
          <div
            style={{
              width: '100%',
              marginLeft: '-10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <br></br>
            <br></br>
            <PropagateLoader color="#EFBEF1" />
          </div>
          <div
            style={{ width: '100%', marginTop: '10px', textAlign: 'center' }}
          >
            Please wait...
          </div>
          <br></br>
        </div>
        <$TierBox>
          <div
            style={{
              width: '90vw',
              minWidth: '250px',
              overflow: 'hidden',
            }}
            ref={elementRef}
          >
            <$TierHeader>
              <$SiteLabel>PK-DIAGRAM</$SiteLabel>
              <FontAwesomeIcon
                style={{ color: 'white', marginLeft: '5px', paddingTop: '6px' }}
                icon={faChartSimple}
              />
            </$TierHeader>
            {tierList.map((x, i) => {
              return (
                <$TierLine className="forMob1">
                  <$TierHead
                    props={colorDatabase}
                    color={i}
                    className="forMob2"
                  >
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <$Subtier style={{ cursor: 'default', opacity: 0 }}>
                        <FontAwesomeIcon icon={faTrash} />
                      </$Subtier>
                      <$MoveUp
                        className="toggle"
                        onClick={() => {
                          move(x.id, 'up');
                        }}
                      />
                      <$Subtier
                        tabIndex={-1}
                        className="toggle"
                        onClick={() => subTier(i)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </$Subtier>
                    </div>
                    <br></br>
                    <$EachLine
                      className="nameLine"
                      id={i}
                      placeholder="new"
                      value={tierList[i].id.split(':')[0]}
                      onChange={(e) => {
                        let distinguish = Date.now();
                        const copy = tierList.slice(0);
                        copy[i].id = e.target.value + ':' + distinguish;
                        setTierList(copy);
                        setCurrentTextArea(i + ':' + distinguish);
                      }}
                      spellCheck={false}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    ></$EachLine>
                    <br></br>
                    <$MoveDown
                      className="toggle"
                      onClick={() => {
                        move(x.id, 'down');
                      }}
                    />
                  </$TierHead>
                  <$TierContents
                    className="onlyhere"
                    key={i}
                    id={tierList[i].id}
                    onDragStart={(e) => {
                      e.stopPropagation();
                      return false;
                      // console.log('ㅇㅇ');
                    }}
                    onDrop={(e) => {
                      drop(e);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onTouchStart={(e) => {}}
                    onTouchMove={(e) => {
                      const { clientX, clientY } = e.touches[0];
                      setOffsetX(clientX);
                      setOffsetY(clientY);
                    }}
                    onTouchEnd={(e) => {
                      dropMobile(
                        document.elementFromPoint(
                          e.changedTouches[0].clientX,
                          e.changedTouches[0].clientY,
                        ),
                      );
                    }}
                  >
                    {x.contentArr.map((itemId) => {
                      return (
                        <$Img
                          onClick={(e) => {
                            // console.log(e.currentTarget);
                            // console.log(tierList);
                          }}
                          className="onlyhere"
                          src={itemId.img}
                          id={itemId.id}
                          onDragStart={(e) => {
                            setSelectedItem({
                              id: itemId.id,
                              img: itemId.img,
                              name: itemId.name,
                            });
                            setPreviousPlace(e.currentTarget.parentNode.id);
                          }}
                          onTouchStart={(e) => {
                            setSelectedItem({
                              id: itemId.id,
                              img: itemId.img,
                              name: itemId.name,
                            });
                            setPreviousPlace(e.currentTarget.parentNode.id);
                            return false;
                          }}
                          onTouchMove={(e) => {
                            // const body =
                            //   document.getElementsByTagName('body')[0];
                            const body =
                              document.getElementsByClassName('App')[0];
                            body.style.overflow = 'hidden';
                            return false;
                          }}
                        ></$Img>
                      );
                    })}
                  </$TierContents>
                </$TierLine>
              );
            })}
          </div>
          <div ref={belowRef} style={{ height: '210px' }}></div>
          <$BottomBar>
            <$ButtonSpace>
              <$CustomButton onClick={addTier}>
                <FontAwesomeIcon icon={faPlus} />
              </$CustomButton>
              <$CustomButton onClick={sorter}>
                <FaSortNumericDown />
              </$CustomButton>
              <$Select
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    border: '2px solid black',
                    borderRadius: '10px',
                  }),
                  placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: 'black',
                  }),
                }}
                onChange={generationChanger}
                options={option}
                placeholder={<AiOutlineOrderedList />}
              />
              <$CustomButton onClick={exportElementAsPNG2}>
                <IoDownloadOutline />
              </$CustomButton>
            </$ButtonSpace>
            <$SearchBar
              ref={searchRef}
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyUp={searchOne}
            ></$SearchBar>
            <$TierThread
              className="onlyhere thread"
              ref={threadRef}
              id={'thread'}
              onDrop={(e) => {
                backToEmpty(e);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onTouchEnd={(e) => {
                dropMobile(
                  document.elementFromPoint(
                    e.changedTouches[0].clientX,
                    e.changedTouches[0].clientY,
                  ),
                );
              }}
            >
              {imgSet.map((x, i) => {
                return (
                  <div>
                    <div
                      style={{
                        height: '25px',
                        width: '100%',
                        backgroundColor: '#282828',
                        color: 'white',
                        fontSize: '12px',
                      }}
                    >
                      {i == 0 && 'PC : Shift + Scroll'}
                      {i == 2 && 'Mobile : Swipe this line'}
                    </div>
                    <$Img
                      onClick={(e) => {
                        // console.log(e.currentTarget);
                      }}
                      className="onlyhere threadImg"
                      id={x.id}
                      src={x.img}
                      onDragStart={(e) => {
                        setSelectedItem({
                          id: x.id,
                          img: x.img,
                          name: x.name,
                        });
                        setPreviousPlace(e.currentTarget.parentNode.id);
                      }}
                      onDrop={(e) => {
                        back(x.id);
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onTouchStart={(e) => {
                        setSelectedItem({
                          id: x.id,
                          img: x.img,
                          name: x.name,
                        });
                        setPreviousPlace(e.currentTarget.parentNode.id);
                        return false;
                      }}
                      onTouchMove={(e) => {
                        if (threadRef.current) {
                          threadRef.current.style.overflowX = 'hidden';
                        }
                        // const body = document.getElementsByTagName('body')[0];
                        const body = document.getElementsByClassName('App')[0];

                        body.style.overflow = 'hidden';
                        const { clientX, clientY } = e.touches[0];
                        setOffsetX(clientX);
                        setOffsetY(clientY);
                        return false;
                      }}
                      onTouchEnd={(e) => {
                        dropMobile(
                          document.elementFromPoint(
                            e.changedTouches[0].clientX,
                            e.changedTouches[0].clientY,
                          ),
                        );
                      }}
                      draggable
                    ></$Img>
                  </div>
                );
              })}
            </$TierThread>
          </$BottomBar>
        </$TierBox>
      </$TierContainer>
      <br></br>
      <br></br>
    </$AllArea>
  );
};

const $MailLink = styled.a`
  margin: 0;
  color: #ccc;
  text-decoration: none;
  width: 100%;
  @media (max-width: 500px) {
    width: 140px;
  }
`;

const $UpbarBottonPlace = styled.div`
  width: 240px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const $GuideEachLine = styled.p`
  margin: 0;
  margin-bottom: 4px;
`;

const $Guide = styled.div`
  position: absolute;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  min-width: 200px;
  font-size: 12px;
  margin-left: 80px;
  margin-bottom: -100px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: start;
  cursor: default;
  @media (max-width: 500px) {
    margin-left: -30px;
  }
`;

const $UpBar = styled.div`
  display: flex;
  width: 92%;
  justify-content: space-between;
  margin-bottom: 5px;
  @media (max-width: 500px) {
    display: block;
  }
`;

const $MoveUp = styled(IoIosArrowUp)`
  cursor: pointer;
  font-size: 30px;
`;

const $MoveDown = styled(IoIosArrowDown)`
  cursor: pointer;
  font-size: 30px;
`;

const $Select = styled(Select)`
  width: 33%;
  font-size: 20px;
`;

const $Select2 = styled(Select)`
  width: 33%;
  min-width: 80px;
`;
const $Select3 = styled(Select)`
  width: 50%;
  min-width: 80px;
`;

const $SearchBar = styled.input`
  width: 93vw;
  height: 30px;
  font-size: 24px;
  &::placeholder {
    font-style: italic;
  }
  margin-bottom: 2px;
  border: 2px solid black;
  border-radius: 5px;
`;

const $ButtonSpace = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
  width: 90vw;
`;

const $BottomBar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  bottom: 10px;
  max-width: 95vw;
  z-index: 5;
`;

const $AllArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const $Img = styled.img`
  width: 128px;
  height: 128px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
`;

const $Subtier = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const $EachLine = styled.textarea`
  font-family: 'wehaven-regular';
  font-style: bold;
  font-size: 30px;
  padding: 0;
  resize: none;
  width: 90%;
  height: 40px;
  overflow: hidden;
  max-width: 90%;
  border: none;
  text-align: center;
  background-color: transparent;
  &::placeholder {
    color: #282828;
    font-style: italic;
  }
  &:focus {
    &::placeholder {
      color: transparent;
    }
  }
`;

const $TierContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const $TierBox = styled.div`
  width: 80vw;
  min-height: 20vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const $TierThread = styled.div`
  display: flex;
  height: 154px;
  width: 100vw;
  border: 2px black solid;
  border-radius: 5px;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: white;
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const $TierLine = styled.div`
  width: 100%;
  min-height: 130px;
  border: 1px black solid;
  background-color: white;
  display: flex;
  @media (max-width: 500px) {
    display: block;
    border: none;
  }
`;

const $TierHeader = styled.div`
  font-family: 'monoton';
  width: 100%;
  padding: 5px 0px;
  border: 1px black solid;
  display: flex;
  background-color: #282828;
  display: flex;
  justify-content: center;
  font-size: 30px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

const $SiteLabel = styled.p`
  padding: 0;
  margin: 0;
  color: white;
  font-size: 30px;
`;

const $TierHead = styled.div`
  background-color: ${(props) => {
    return props.props[props.color % 18];
  }};
  width: 120px;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const $TierContents = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background-color: #282828;
  align-content: flex-start;
  padding: 5px;
  min-height: 130px;
`;

const $CustomButton = styled.button`
  font-size: 20px;
  width: 33%;
  background-color: white;
  border-radius: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover {
    background-color: #ebb3d4;
  }
`;

const $GuidePlace = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  @media (max-width: 500px) {
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }
`;

export { Tiermaker };
