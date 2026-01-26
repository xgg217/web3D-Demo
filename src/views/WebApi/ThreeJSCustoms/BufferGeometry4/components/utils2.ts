import * as THREE from "three";

const SCALE = 10; // 间距

// 刻度线
export const { cereateScaleline } = (() => {
  const HEIGHT = 10; // 刻度线高度

  // x轴（含刻度线）
  const cereateX = (val: number) => {
    const group = new THREE.Group();

    // x轴
    {
      const geometry = new THREE.BufferGeometry();

      const vertices = new Float32Array([0, 0, 0, val, 0, 0]);
      geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);

      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color("orange"),
      });

      const line = new THREE.Line(geometry, material);
      group.add(line);
    }

    // 刻度线
    {
      const len = Math.floor(val / SCALE);
      const arr: number[] = [];

      for (let i = 1; i < len; i++) {
        const start = [i * 10, 0, 0];
        const end = [i * 10, -HEIGHT, 0];
        arr.push(...start, ...end);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(arr), 3);
      const material = new THREE.LineDashedMaterial({
        scale: 3,
      });
      const line = new THREE.LineSegments(geometry, material);
      group.add(line);
    }

    return group;
  };

  // y轴
  const cereateY = (val: number) => {
    const group = new THREE.Group();

    // y轴
    {
      const geometry = new THREE.BufferGeometry();

      const vertices = new Float32Array([0, 0, 0, 0, val, 0]);
      geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);

      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color("blue"),
      });

      const line = new THREE.Line(geometry, material);
      group.add(line);
    }

    // 刻度线
    {
      const len = Math.floor(val / SCALE);
      const arr: number[] = [];

      for (let i = 1; i < len; i++) {
        const start = [0, i * 10, 0];
        const end = [-HEIGHT, i * 10, 0];
        arr.push(...start, ...end);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(arr), 3);
      const material = new THREE.LineDashedMaterial({
        scale: 3,
      });
      const line = new THREE.LineSegments(geometry, material);
      group.add(line);
    }

    return group;
  };

  /**
   * 默认x轴是坐标系的x轴，y轴是坐标系的y轴
   * @param x x轴长度
   * @param y y轴长度
   */
  const cereateScaleline = (x: number, y: number) => {
    const group = new THREE.Group();

    // x轴
    const xLin = cereateX(x);
    group.add(xLin);

    // y轴
    const yLin = cereateY(y);
    group.add(yLin);

    return group;
  };

  return { cereateScaleline };
})();

// 柱状图1
export const { cereateBarChart } = (() => {
  // 设置颜色
  const setColor = (len: number) => {
    const color1 = new THREE.Color("red");
    const color2 = new THREE.Color("blue");
    const colorsArr: number[] = [];
    for (let i = 0; i < len; i++) {
      const percent = i / len;
      const c = color1.clone().lerp(color2, percent);
      colorsArr.push(c.r, c.g, c.b);
    }
    return colorsArr;
  };

  /**
   *
   * @param arr 柱状图的高度
   */
  const cereateBarChart = (arr: number[]) => {
    const bars = new THREE.Group();

    arr.forEach((item, i) => {
      const geometry = new THREE.PlaneGeometry(10, item);

      // 设置颜色
      {
        const arr = setColor(geometry.attributes.position.count);
        const colors = new Float32Array(arr);
        geometry.attributes.color = new THREE.BufferAttribute(colors, 3);
      }

      const material = new THREE.MeshBasicMaterial({
        // color: "orange",
        vertexColors: true,
      });

      const bar = new THREE.Mesh(geometry, material);
      bar.position.x = 10 + i * 20 + 5;
      bar.position.y = item / 2;
      bars.add(bar);
    });

    return bars;
  };

  return {
    cereateBarChart,
  };
})();

// 柱状图2
export const { cereateBarChart2 } = (() => {
  // 设置颜色
  const setColor = (position: THREE.BufferAttribute, item: number) => {
    const color1 = new THREE.Color("green");
    const color2 = new THREE.Color("blue");
    const color3 = new THREE.Color("red");
    const colorsArr: number[] = [];
    for (let i = 0; i < position.count; i++) {
      const y = position.getY(i) + item / 2;

      if (y <= 50) {
        const percet = y / 50;
        const c = color1.clone().lerp(color2, percet);
        colorsArr.push(c.r, c.g, c.b);
      } else {
        const percet = (y - 50) / 50;
        const c = color2.clone().lerp(color3, percet);
        colorsArr.push(c.r, c.g, c.b);
      }

      // const percent = i / len;
      // const c = color1.clone().lerp(color2, percent);
      // colorsArr.push(c.r, c.g, c.b);
    }
    return colorsArr;
  };

  /**
   *
   * @param arr 柱状图的高度
   */
  const cereateBarChart2 = (arr: number[]) => {
    const bars = new THREE.Group();

    arr.forEach((item, i) => {
      const geometry = new THREE.PlaneGeometry(10, item, 1, 20);

      // 设置颜色
      {
        const arr = setColor(geometry.attributes.position as THREE.BufferAttribute, item);
        const colors = new Float32Array(arr);
        geometry.attributes.color = new THREE.BufferAttribute(colors, 3);
      }

      const material = new THREE.MeshBasicMaterial({
        // color: "orange",
        vertexColors: true,
      });

      const bar = new THREE.Mesh(geometry, material);
      bar.position.x = 10 + i * 20 + 5;
      bar.position.y = item / 2;
      bars.add(bar);
    });

    return bars;
  };

  return {
    cereateBarChart2,
  };
})();
